import SchoolSchema from "../models/school.models.js";
import { v2 as cloudinary } from "cloudinary";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Management from "../models/management.models.js";
import { uploadVideoOnCloudinary } from "../utils/cloudinary.js";

const handleHeroSection = async (req, res) => {
    const { subtitle, title } = req.body;
    const file = req.file;

    try {
        let imgUrl = "";

        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(400).json({
                response: "error",
                message: "School does not exist"
            })
        }

        const images = schoolData.homeHeroSection?.heroImage;

        if (file && images) {
            const segment = images.split('/');
            const fileNameWithExtension = segment[segment.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
            console.log("Deleted image: ", result);
        }

        if (file) {
            const uploadResult = await uploadOnCloudinary(file.path);
            imgUrl = uploadResult.secure_url || "";
            schoolData.homeHeroSection.heroImage = imgUrl;
        }

        if (subtitle) {
            schoolData.homeHeroSection.heroSubtitle = subtitle;
        }

        if (title) {
            schoolData.homeHeroSection.heroTitle = title;
        }

        const result = await schoolData.save();

        const dataToSend = {
            image: result.homeHeroSection?.heroImage,
            title: result.homeHeroSection?.heroTitle,
            subtitle: result.homeHeroSection?.heroSubtitle
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while updating hero section"
        })
    }
}

const handleGetHomeHeroSection = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        const dataToSend = {
            image: schoolData.homeHeroSection?.heroImage,
            title: schoolData.homeHeroSection?.heroTitle,
            subtitle: schoolData.homeHeroSection?.heroSubtitle
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while fetching hero section"
        })
    }
}

const handleAddAboutUs = async (req, res) => {
    const { title, details } = req.body;
    const file = req.file; // The video file from multer

    // --- 1. Validation ---
    // This size validation is good practice to prevent large uploads before they hit Cloudinary.
    // The logic correctly rejects files smaller than 5MB or larger/equal to 15MB.
    if (file && (file.size < 5242880 || file.size >= 26214400)) {
        return res.status(400).json({ // Use 400 for bad request
            response: "error",
            message: "File size must be between 5MB and 15MB"
        });
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            });
        }

        // --- 2. Delete Old Video (if a new one is uploaded) ---
        const oldVideoUrl = schoolData.homeAboutUs?.video;

        if (file && oldVideoUrl) {
            // 💡 BEST PRACTICE: It's more reliable to store the 'public_id' in your database.
            // However, this logic will work for simple Cloudinary URLs.
            const segments = oldVideoUrl.split('/');
            const publicIdWithFormat = segments[segments.length - 1];
            const publicId = publicIdWithFormat.split('.')[0];

            // 🐛 FIX: You MUST specify the resource_type when deleting videos.
            await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
            console.log("Old video deletion initiated for publicId:", publicId);
        }

        let newVideoUrl = schoolData.homeAboutUs?.video; // Default to old URL

        // --- 3. Upload New Video (if it exists) ---
        if (file) {
            // ✨ CHANGE: Call the new dedicated video upload function.
            const uploadResult = await uploadVideoOnCloudinary(file.path);

            if (!uploadResult) {
                return res.status(500).json({
                    response: "error",
                    message: "Failed to upload video to Cloudinary."
                });
            }

            // ✨ CHANGE: Get the URL from the 'eager' transformation result.
            // This URL will be for the converted .mp4 file.
            // We'll wait a few seconds to give Cloudinary time to process the eager transformation.
            // In a production app, a webhook is the best solution.
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

            const refreshedAsset = await cloudinary.api.resource(uploadResult.public_id, { resource_type: "video" });

            if (refreshedAsset.eager && refreshedAsset.eager[0]) {
                newVideoUrl = refreshedAsset.eager[0].secure_url;
            } else {
                // Fallback if eager transformation is not ready
                console.warn("Eager transformation not ready, falling back to original URL with .mp4 format change.");
                newVideoUrl = uploadResult.secure_url.replace(/\.\w+$/, ".mp4");
            }
        }

        // --- 4. Update Database ---
        schoolData.homeAboutUs.video = newVideoUrl;
        if (details) schoolData.homeAboutUs.details = details;
        if (title) schoolData.homeAboutUs.title = title;

        const result = await schoolData.save();

        // --- 5. Send Success Response ---
        const dataToSend = {
            video: result.homeAboutUs?.video,
            title: result.homeAboutUs?.title,
            details: result.homeAboutUs?.details // 🐛 FIX: Changed subtitle to details for consistency
        };

        return res.status(200).json({
            response: "success",
            result: dataToSend
        });

    } catch (error) {
        console.error("Error in handleAddAboutUs:", error);
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while updating About Us section"
        });
    }
};

const handleGetAboutUs = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const dataToSend = {
            video: schoolData.homeAboutUs?.video,
            title: schoolData.homeAboutUs?.title,
            details: schoolData.homeAboutUs?.details
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching about us"
        })
    }
}

const handleAddNotice = async (req, res) => {
    const { notice } = req.body;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        schoolData.notice.push(notice);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = updatedSchoolData.notice

        return res.status(200).json({
            response: "success",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Unable to add notice"
        })
    }
}

const handleUpdateNotice = async (req, res) => {
    const { idx } = req.params;
    const { notice } = req.body;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not exist"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.notice.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }

        schoolData.notice[index] = notice;
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = updatedSchoolData.notice;

        console.log(allNotices);

        return res.status(200).json({
            response: "success",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error updating notice"
        })
    }
}

const handleGetNotices = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = schoolData.notice;

        return res.status(200).json({
            response: "success",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all notices"
        })
    }
}

const handleDeleteNotice = async (req, res) => {
    const { idx } = req.params;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.notice.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        schoolData.notice.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = updatedSchoolData.notice;

        return res.status(200).json({
            response: "success",
            message: "Notice deleted",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting notice"
        })
    }
}

const handleAddNewAchievement = async (req, res) => {
    const { achievement } = req.body;

    if (!achievement) {
        return res.status(404).json({
            response: "error",
            message: "Empty field! Type something to add in achievement"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        schoolData.achievement.push(achievement);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allAchievements = updatedSchoolData.achievement;

        return res.status(200).json({
            response: "success",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while adding achievement"
        })
    }
}

const handleGetAllAchievements = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const allAchievements = schoolData.achievement;

        return res.status(200).json({
            response: "success",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all achievements"
        })
    }
}

const handleUpdateAchievement = async (req, res) => {
    const { idx } = req.params;
    const { achievement } = req.body;

    if (!achievement) {
        return res.status(404).json({
            response: "error",
            message: "Achievement field cannot be empty!"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.achievement.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }

        schoolData.achievement[index] = achievement;
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allAchievements = updatedSchoolData.achievement;

        return res.status(200).json({
            response: "success",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error updating achievement"
        })
    }
}

const handleDeleteAchievement = async (req, res) => {
    const { idx } = req.params;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "Invalid school"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.achievement.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        schoolData.achievement.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allAchievements = updatedSchoolData.achievement;

        return res.status(200).json({
            response: "success",
            message: "Achievement deleted",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error deleting achievement"
        })
    }
}

const handleAddNews = async (req, res) => {
    const { news } = req.body;

    if (!news) {
        return res.status(404).json({
            response: "error",
            message: "News field cannot be empty"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        if (schoolData.news.length >= 10) {
            return res.status(404).json({
                response: "error",
                message: "Maximum 10 news are allowed."
            })
        }

        schoolData.news.push(news);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNews = updatedSchoolData.news;

        return res.status(200).json({
            response: "success",
            result: allNews
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "News adding failed!!"
        })
    }
}

const handleGetAllNews = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const allNews = schoolData.news;

        return res.status(200).json({
            response: "success",
            result: allNews
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all news"
        })
    }
}

const handleUpdateNews = async (req, res) => {
    const { idx } = req.params;
    const { news } = req.body;

    if (!news) {
        return res.status(404).json({
            response: "error",
            message: "News field cannot be empty!"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.news.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }

        schoolData.news[index] = news;
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNews = updatedSchoolData.news;

        return res.status(200).json({
            response: "success",
            result: allNews
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error updating news"
        })
    }
}

const handleDeleteNews = async (req, res) => {
    const { idx } = req.params;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "Invalid school"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.news.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        schoolData.news.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNews = updatedSchoolData.news;

        return res.status(200).json({
            response: "success",
            message: "News deleted",
            result: allNews
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error deleting news"
        })
    }
}

const handleAddNewQuotation = async (req, res) => {
    const { quote } = req.body;

    if (!quote) {
        return res.status(404).json({
            response: "error",
            message: "Quotation field cannot be empty"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        if (schoolData.quotation.length >= 2) {
            return res.status(404).json({
                response: "error",
                message: "Maximum 2 quotations are allowed."
            })
        }

        schoolData.quotation.push(quote);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allQuotation = updatedSchoolData.quotation;

        return res.status(200).json({
            response: "success",
            result: allQuotation
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Quotation adding failed!!"
        })
    }
}

const handleGetAllQuotation = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const allQuotation = schoolData.quotation;

        return res.status(200).json({
            response: "success",
            result: allQuotation
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all quotation"
        })
    }
}

const handleUpdateQuotation = async (req, res) => {
    const { idx } = req.params;
    const { quote } = req.body;

    if (!quote) {
        return res.status(404).json({
            response: "error",
            message: "Quotation field cannot be empty!"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.quotation.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }

        schoolData.quotation[index] = quote;
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allQuotation = updatedSchoolData.quotation;

        return res.status(200).json({
            response: "success",
            result: allQuotation
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error updating quotation"
        })
    }
}

const handleDeleteQuotation = async (req, res) => {
    const { idx } = req.params;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if (!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "Invalid school"
            })
        }

        const index = parseInt(idx);
        if (isNaN(index) || index < 0 || index >= schoolData.quotation.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        schoolData.quotation.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allQuotation = updatedSchoolData.quotation;

        return res.status(200).json({
            response: "success",
            message: "Quotation deleted",
            result: allQuotation
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error deleting quotation"
        })
    }
}

const handleAddManagement = async (req, res) => {
    const { name, designation } = req.body;
    const file = req.file;

    if (!name || !designation) {
        return res.status(404).json({
            response: "error",
            message: "Name and Designation are required"
        })
    }

    if (!file) {
        return res.status(404).json({
            response: "error",
            message: "Image is required"
        })
    }

    try {
        let imgUrl = "";

        if (file) {
            const imgupload = await uploadOnCloudinary(file.path);
            imgUrl = imgupload.secure_url || "";
        }

        const addedManagement = await Management.create({ name: name, designation: designation, profileImage: imgUrl })

        return res.status(200).json({
            response: "success",
            result: addedManagement
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while adding data"
        })
    }
}

const handleGetAllManagement = async (req, res) => {
    try {
        const allManagement = await Management.find({});
        return res.status(200).json({
            response: "success",
            result: allManagement
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all management staff"
        })
    }
}

const handleDeleteManagement = async (req, res) => {
    const { id } = req.params;

    try {
        const management = await Management.findById({ _id: id });

        if (management.profileImage) {
            const segment = management.profileImage.split('/');
            console.log(segment);
            const fileNameWithExtension = segment[segment.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
            console.log(result);
        }
        await Management.findByIdAndDelete({ _id: id });
        const allManagement = await Management.find({});
        return res.status(200).json({
            response: "success",
            message: "Staff Deleted",
            result: allManagement
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting staff details"
        })
    }
}

export {
    handleHeroSection,
    handleGetHomeHeroSection,
    handleAddNotice,
    handleUpdateNotice,
    handleGetNotices,
    handleDeleteNotice,
    handleAddNewAchievement,
    handleGetAllAchievements,
    handleUpdateAchievement,
    handleDeleteAchievement,
    handleAddNews,
    handleGetAllNews,
    handleUpdateNews,
    handleDeleteNews,
    handleAddNewQuotation,
    handleGetAllQuotation,
    handleUpdateQuotation,
    handleDeleteQuotation,
    handleAddManagement,
    handleGetAllManagement,
    handleDeleteManagement,
    handleAddAboutUs,
    handleGetAboutUs
}
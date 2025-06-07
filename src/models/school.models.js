import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            default: "DSD",
            unique: true
        },
        tagline: {
            type: String
        },
        aboutUs: {
            title: {
                type: String,
                required: [true, "Title is required"]
            },
            description: {
                type: String
            },
            image: {
                type: String,
            }
        },
        academicImages: {
            type: [String]
        },
        address: {
            addressLine1: {
                type: String,
                required: true
            },
            addressLine2: {
                type: String
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pin: {
                type: String,
                required: true
            }
        },
        mapAddress: {
            type: String
        },
        heroSectionImage: {
            type: [String]
        },
        heroImageText: {
            type: [String]
        },
        homeHeroSection: {
            heroImage: {
                type: String
            },
            heroSubtitle: {
                type: String
            },
            heroTitle: {
                type: String
            }
        },
        notice: {
            type: [String]
        },
        achievement: {
            type: [String]
        },
        news: {
            type: [String]
        },
        quotation: {
            type: [String]
        }
    }, {
        timestamps: true
    }
);

const SchoolSchema = mongoose.model("schoolSchema", schoolSchema);

export default SchoolSchema;
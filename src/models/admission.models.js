import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            firstName: {
                type: String,
                required: true
            },
            middleName: {
                type: String
            },
            lastName: {
                type: String,
                required: true
            }
        },
        class: {
            type: String,
            enum: ["Nursury", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th"],
            required: true
        },
        DOB: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },
        placeOfBirth: {
            type: String
        },
        nationality: {
            type: String,
            required: true
        },
        caste: {
            type: String,
            enum: ["SC", "ST", "OBC", "General"],
            required: true
        },
        bloodGroup: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
        },
        motherTongue: {
            type: String
        },
        religion: {
            type: String,
            enum: [
                'Hinduism',
                'Islam',
                'Christianity',
                'Sikhism',
                'Buddhism',
                'Jainism',
                'Judaism',
                'Atheist',
                'Other'
            ],
            required: true
        },
        studentAadhar: {
            type: String,
            required: true
        },
        residenceAddress: {
            addressLine1: {
                type: String,
                required: true
            },
            addressLine2: {
                type: String
            },
            district: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            }
        },
        permanentAddress: {
            addressLine1: {
                type: String,
                required: true
            },
            addressLine2: {
                type: String
            },
            district: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            }
        },
        mobileNo: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        family: {
            fatherDetail: {
                name: {
                    firstName: {
                        type: String,
                        required: true
                    },
                    middleName: {
                        type: String
                    },
                    lastName: {
                        type: String,
                        required: true
                    }
                },
                DOB: {
                    type: String
                },
                fatherAadhar: {
                    type: String
                },
                education: {
                    type: String,
                    enum: [
                        'Illiterate',
                        'Primary',
                        'High School',
                        'Graduate',
                        'Postgraduate and Above'
                    ],
                    required: true
                },
                occupation: {
                    type: String,
                    required: true
                },
                mobileNo: {
                    type: String,
                    required: true
                },
                email: {
                    type: String
                },
                bloodGroup: {
                    type: String,
                    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
                }
            },
            motherDetail: {
                name: {
                    firstName: {
                        type: String,
                        required: true
                    },
                    middleName: {
                        type: String
                    },
                    lastName: {
                        type: String,
                        required: true
                    }
                },
                DOB: {
                    type: String
                },
                motherAadhar: {
                    type: String
                },
                education: {
                    type: String,
                    enum: [
                        'Illiterate',
                        'Primary',
                        'High School',
                        'Graduate',
                        'Postgraduate and Above'
                    ],
                    required: true
                },
                occupation: {
                    type: String,
                    required: true
                },
                mobileNo: {
                    type: String,
                    required: true
                },
                email: {
                    type: String
                },
                bloodGroup: {
                    type: String,
                    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
                }
            },
            annualFamilyIncome: {
                type: String,
                enum: ["Upto 1 Lakh", "1 to 3 Lakh", "3 to 5 Lakh", "More than 5 Lakh"]
            },
            childLivesWith: {
                type: String,
                enum: ["Father", "Mother", "Both Parents", "Guardian"]
            },
            localGuardianDetails: {
                name: {
                    type: String
                },
                address: {
                    type: String
                },
                mobileNo: {
                    type: String
                },
                relationWithChild: {
                    type: String
                }
            },
            siblings: [
                {
                    name: {
                        type: String
                    },
                    age: {
                        type: Number
                    },
                    gender: {
                        type: String,
                        enum: ["Male", "Female", "Other"]
                    },
                    school: {
                        type: String
                    }
                }
            ],
            languageAtHome: {
                type: String
            },
            requireSchoolTransport: {
                type: String,
                enum: ["Yes", "No"],
                default: "No",
                required: true
            },
            realSiblingInSchool: {
                name: {
                    type: String
                },
                class: {
                    type: String,
                    enum: ["Nursury", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th"],
                },
                regdNo: {
                    type: String
                }
            }
        },
        historyOfChild: [
            {
                schoolName: {
                    type: String
                },
                city: {
                    type: String
                },
                Board: {
                    type: String,
                    enum: ["State Board", "CBSE", "ICSE", "Other"]
                },
                yearCompleted: {
                    type: Number
                },
                grade: {
                    type: String
                },
                reasonOfLeaving: {
                    type: String
                }
            }
        ],
        documents: {
            studentPhoto: {
                type: String,
                required: true
            },
            fatherPhoto: {
                type: String,
                required: true
            },
            motherPhoto: {
                type: String,
                required: true
            },
            bithCertificate: {
                type: String,
                required: true
            },
            previousSchoolReportCard: {
                type: String
            },
            achievementCertificate: [
                {
                    type: String
                }
            ],
            aadharCard: {
                type: String,
                required: true
            },
            disabilityCertificate: {
                type: String
            },
            residenceProof: {
                type: String,
                required: true
            },
            transferCertificate: {
                type: String
            },
            signature: {
                type: String,
                required: true
            }
        }
    }, {
    timestamps: true
}
);

const Students = mongoose.model("students", studentSchema);

export default Students;
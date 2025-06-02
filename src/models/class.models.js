import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        subjectName: {
            type: String,
            required: true
        },
        timing: {
            type: String,
            required: true
        }
    }, {
        _id: false
    }
)

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true
    },
    timeTable: {
        Monday: [subjectSchema],
        Tuesday: [subjectSchema],
        Wednesday: [subjectSchema],
        Thursday: [subjectSchema],
        Friday: [subjectSchema],
        Saturday: [subjectSchema]
    }
}, {
    timestamps: true
});

const ClassSchema = mongoose.model('classSchema', classSchema);

export default ClassSchema;
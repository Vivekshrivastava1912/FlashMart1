import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        category : [{
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        } ]
    },
    { timestamps: true }
)

// Yahan par fix kiya gaya hai:
const subCategoryModel = mongoose.models.subcategory || mongoose.model('subcategory', subcategorySchema)

export default subCategoryModel
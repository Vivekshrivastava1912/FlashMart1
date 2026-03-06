import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

const uploadImageController = async(request, response) => {
    try {
        console.log("1. Request received in Controller"); // Check 1

        const file = request.file
        console.log("2. File Info:", file); // Check 2: Kya file aayi?

        if (!file) {
            console.log("Error: File is missing");
            return response.status(400).json({
                message: "File not found. Multer middleware check karein.",
                error: true,
                success: false
            })
        }

        console.log("3. Starting Cloudinary Upload...");
        const uploadImage = await uploadImageCloudinary(file)
        console.log("4. Cloudinary Upload Result:", uploadImage); // Check 3: Kya upload hua?

        return response.json({
            message: "Upload Done",
            data: uploadImage,
            success: true,
            error: false
        })

    } catch(error) {
        console.error("ERROR in Controller:", error); // Error print karega
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default uploadImageController
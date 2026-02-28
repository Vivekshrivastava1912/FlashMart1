
import ProductModel from "../models/product.model.js"





// Add Product Controller
export const addProductController = async (request, response) => {
    try {
        const { 
            name, image, category, subCategory, unit, 
            stock, price, discount, discription, more_details, publish 
        } = request.body;

        // Validation: Main fields check kar rahe hain
        if (!name || !image || !category[0] || !subCategory[0] || !price) {
            return response.status(400).json({
                message: "Name, image, category, subCategory, and price are required",
                error: true,
                success: false
            });
        }

        // Payload preparation: Array se sirf _id nikal kar save kar rahe hain
        const payload = {
            name,
            image,
            category: category[0]._id,       // Single ID save hogi
            subCategory: subCategory[0]._id, // Single ID save hogi
            unit,
            stock,
            price,
            discount,
            description: discription,        // Frontend 'discription' to DB 'description' mapping
            more_details,
            publish
        };

        const createProduct = new ProductModel(payload);
        const save = await createProduct.save();

        return response.status(200).json({
            message: "Product created and saved in database successfully",
            data: save,
            error: false,
            success: true
        });

    } catch (error) {
        console.log("Database Save Error: ", error); 
        return response.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
}

// ... Baaki get, update, delete controllers wese hi rahenge jese pehle the

// Get Product Controller
// Get Product Controller
export const getProductController = async (request, response) => {
    try {
        // 🔥 FIX: Sirf _id ke basis pe ascending sort karenge. Isse data jis order me DB me gaya hai, waise hi aayega.
        const data = await ProductModel.find().sort({ _id: 1 });

        return response.status(200).json({
            message: "Products fetched successfully",
            data: data,
            error: false,
            success: true
        });

    } catch (error) {
        console.log("Get Product Error: ", error); // Terminal check karne ke liye
        return response.status(500).json({
            message: error.message || "Error fetching products",
            error: true,
            success: false
        });
    }
}

// Update Product Controller
export const updateProductController = async (request, response) => {
    try {
        const { 
            _id, name, image, category, subCategory, unit, 
            stock, price, discount, discription, more_details, publish 
        } = request.body;

        if(!_id){
            return response.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            })
        }

        const updateProduct = await ProductModel.findByIdAndUpdate(
            _id,
            {
                name,
                image,
                category,
                subCategory,
                unit,
                stock,
                price,
                discount,
                description: discription, // Mapping frontend 'discription' to DB 'description'
                more_details,
                publish
            },
            { new: true }
        );

        return response.status(200).json({
            message: "Product updated successfully",
            data: updateProduct,
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
// Delete Product Controller
export const deleteProductController = async (request, response) => {
    try {
        const { _id } = request.body;

        // Check ki kya product exist karta hai
        const checkProduct = await ProductModel.findById(_id);
        if (!checkProduct) {
            return response.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        // Database se delete karna
        const deleteProduct = await ProductModel.findByIdAndDelete(_id);

        return response.status(200).json({
            message: "Product deleted successfully",
            data: deleteProduct,
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
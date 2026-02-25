import SubCategoryModel from "../models/subCategory.model.js" // .js add kar diya


export  const AddSubCategoryController = async (request, response)=>{
    try{
        const { name, image , category } = request.body

if(!name || !image || !category[0]){

    return response.status(400).json({
        message : "All fields are required",
        error : true ,
        success : false
    })

          }


    const payload = {
        name,
        image,
        category
    }
    const createSubCategory = new SubCategoryModel(payload)
  const save = await createSubCategory.save()
  return response.status(200).json({
    message : "SubCategory created successfully",
    data : save ,
    error : false ,
    success : true 
  })



    }
    catch(error){
   return response.status(500).json({
    message : error.message || error ,
    error : true ,
    success :false
   })
    }
}
export const getSubCategoryController = async (request , response) => {
    try {
        const data = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category');
        
        return response.json({
            message: "SubCategory fetched successfully",
            data: data,
            error: false,
            success: true
        });

    } catch(error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const updateSubCategoryController = async (request , response) => {
 try{
   const {_id , name , image , category}= request.body

const cheackSub = await SubCategoryModel.findById(_id)
if(!cheackSub){
    return response.status(404).json({
        message : "SubCategory not found",
        error : true,
        success : false
    })
}



   const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(
    _id,
    {
        name,
        image,
        category
    },
    { new: true }
   )
   return response.status(200).json({
    message : "SubCategory updated successfully",
    data : updateSubCategory,
    error : false,
    success : true
   })
 }
 catch(error){
    return response.status(500).json({
        message : error.message || error,
        error : true, 
        success : false
    })
 }
}

export const deleteSubCategoryController = async (request, response) => {
    try {
        const { _id } = request.body // Ya fir request.params se bhi le sakte hain

        // Check ki kya subcategory exist karti hai
        const checkSub = await SubCategoryModel.findById(_id)
        if (!checkSub) {
            return response.status(404).json({
                message: "SubCategory not found",
                error: true,
                success: false
            })
        }

        // Database se delete karna
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        return response.status(200).json({
            message: "SubCategory deleted successfully",
            data: deleteSub,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
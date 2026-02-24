import ForgotPassword from "../pages/ForgotPassword"

// Isse 5173 se badal kar 8000 kar dein
export const baseURL = "http://localhost:8000" 

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : "post"
    },
    login : {
        url : '/api/user/login',
        method : "post"
    } ,

    ForgotPassword : {
        url :'/api/user/forget-password',
        method : "put"
    },

    refreshtoken :{
        url : "/api/user/refresh-token",
        method : "post"
    },
    userDetails : {
        url : "/api/user/user-details" ,
        method : "get"
    },
    addCategory : {
        url : '/api/category/add-category',
        method : "post"

    },

    uploadeImage :{
        url : '/api/file/upload',
        method : "post"
    },
    getCategory : {
        url : '/api/category/get',
        method : "get"
    },
    updateCategory : {
        url : '/api/category/update',
        method : "put"
    },
    deleteCategory : {
        url : '/api/category/delete',
        method : "delete"
    },
    createSubCategory :{
        url : '/api/subcategory/create',
        method : "post"
    },
    getSubCategory : {
        url : '/api/subcategory/get',
        method : "get"
    }

}

export default SummaryApi
// Dynamically set baseURL: VITE_API_URL or localhost:8000 when running locally, or deployed backend on Vercel
export const baseURL = import.meta.env.VITE_API_URL || 
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8000"
    : "https://flash-mart-neon.vercel.app");

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: "post"
    },
    login: {
        url: '/api/user/login',
        method: "post"
    },
    logout: {
        url: '/api/user/logout',
        method: 'get'
    },
    uploadAvatar: {
        url: '/api/user/upload-avatar',
        method: 'put'
    },
    updateUser: {
        url: '/api/user/update-user',
        method: 'put'
    },
    ForgotPassword: {
        url: '/api/user/forget-password',
        method: "put"
    },
    verifyForgotPasswordOtp: {
        url: '/api/user/verify-forgot-password-otp',
        method: 'put'
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: 'put'
    },
    refreshtoken: {
        url: "/api/user/refresh-token",
        method: "post"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "get"
    },
    addCategory: {
        url: '/api/category/add-category',
        method: "post"
    },
    uploadeImage: {
        url: '/api/file/upload',
        method: "post"
    },
    getCategory: {
        url: '/api/category/get',
        method: "get"
    },
    updateCategory: {
        url: '/api/category/update',
        method: "put"
    },
    deleteCategory: {
        url: '/api/category/delete',
        method: "delete"
    },
    createSubCategory: {
        url: '/api/subcategory/create',
        method: "post"
    },
    getSubCategory: {
        url: '/api/subcategory/get',
        method: "get"
    },
    updateSubCategory: {
        url: '/api/subcategory/update',
        method: "put"
    },
    deleteSubCategory: {
        url: '/api/subcategory/delete',
        method: "delete"
    },
    addProduct: {
        url: '/api/product/add-product',
        method: "post"
    },
    getProduct: {
        url: '/api/product/get',
        method: "get"
    },
    updateProduct: {
        url: '/api/product/update',
        method: "put"
    },
    deleteProduct: {
        url: '/api/product/delete',
        method: "delete"
    }
}

export default SummaryApi
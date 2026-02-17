import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import UserDetails from "../component/userDetails";
import UserUpdate from "../pages/UserUpdate";
import MyOrder from "../pages/MyOrder";
import MyCard from "../pages/MyCard";
import Product from "../pages/Product";
import CategoryPage from "../pages/CategoryPage";
import UploadProduct from "../pages/UploadProduct";
import SubCategoryPage from "../pages/SubCategoryPage";





const router = createBrowserRouter([{
  path: "/",
  element: <App />,



  children: [{
    path: "/",
    element: <Home />

  },
  {
    path: "Search",
    element: <SearchPage />

  }
    ,
  {
    path: "Login",
    element: <Login />

  }

    ,
  {
    path: "register",
    element: <Register />

  }
    ,
  {
    path: "forgotpassword",
    element: <ForgotPassword />

  }
    ,
  {
    path: "verifyotp",
    element: <VerifyOtp />

  }
    ,
  {
    path: "resetpassword",
    element: <ResetPassword />

  },
  {
    path: "userdetails",
    element: <UserDetails />
  },

  {
    path: "userdetailupdate",
    element: <UserUpdate />
  },
  {
    path: "myorder",
    element: <MyOrder />

  },

  {
    path: "mycard",
    element: <MyCard />
  },

  {
    path: "product",
    element: <Product />
  },

  {
    path: "categorypage",
    element: <CategoryPage />
  },
  {
    path: "uploadproduct",
    element: <UploadProduct />
  },
  {
    path: "subcategorypage",
    element: <SubCategoryPage />
  }









  ]

}])

export default router
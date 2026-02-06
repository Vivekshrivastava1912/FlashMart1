import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";




const router = createBrowserRouter([{
    path: "/",
    element: <App /> ,



children :[{
      path: "/",
    element: <Home />

} ,
{
      path: "Search",
    element: <SearchPage/>

}
,
{
      path: "login",
    element: <Login/>

}

,
{
      path: "register",
    element: <Register/>

}
,
{
      path: "forgotpassword",
    element: <ForgotPassword/>

}
,
{
      path: "verifyotp",
    element: <VerifyOtp/>

}





]




}])

export default router
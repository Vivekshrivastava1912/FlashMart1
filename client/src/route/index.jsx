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
      path: "Login",
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
,
{
      path: "resetpassword",
    element: <ResetPassword/>

},
{
  path : "userdetails" ,
  element : <UserDetails/>
}







]




}])

export default router
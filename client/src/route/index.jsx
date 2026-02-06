import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/login";
import Register from "../pages/Register";
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





]




}])

export default router
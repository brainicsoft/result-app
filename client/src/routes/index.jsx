import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Admin from "../layout/Admin";
import Login from "../pages/Login";
import ResultList from "../pages/Admin/ResultList";
import AddResult from "../pages/Admin/AddResult";
import AddSubject from "../pages/Admin/AddSubject";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/", element: <Home/> },
            { path: "/dashboard/login", element: <Login/> },

        ],
        

    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            { path: "/admin", element: <ResultList/> },
            { path: "/admin/add-result", element: <AddResult/> },
            { path: "/admin/add-subjects", element: <AddSubject/> },
        ],
    }
    
])
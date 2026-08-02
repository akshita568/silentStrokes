import { createBrowserRouter, Outlet } from "react-router-dom";
import Main from "../Main/Main.jsx";
import ErrorPage from "../pages/error/ErrorPage";
import RippleCursor from "../components/shared/RippleCursor.jsx";

// Public Pages for the Art Portfolio
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Portfolio from "../pages/portfolio/Portfolio"; 
import Booking from "../pages/bookings/Booking";

// Shop, Cart, and Auth
import Shop from "../pages/shop/Shop";
import MyCart from "../pages/shop/MyCart";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Profile from "../pages/Profile/Profile";
import ReviewForm from "../pages/Review/ReviewForm"; 

// 👇 IMPORT YOUR BOUNCER FROM THE SAME FOLDER
import AdminRouter from "./AdminRoute"; 

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <RippleCursor />
                <Main />
            </>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/booking", element: <Booking /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/leave-a-note", element: <ReviewForm /> },
            { path: "/portfolio", element: <Portfolio /> },
            { path: "/shop", element: <Shop /> },
            { path: "/my-cart", element: <MyCart /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/profile", element: <Profile /> }
        ],
    },
    // 👇 YOUR SECURE ADMIN SECTION
    {
        path: "/admin",
        element: (
            <AdminRouter>
                <div className="min-h-screen bg-base-white p-8 md:p-12 font-sans text-text-main">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-serif mb-8 border-b border-sand pb-4">Studio Dashboard</h1>
                        <Outlet /> 
                    </div>
                </div>
            </AdminRouter>
        ),
        children: [
            {
                path: "dashboard",
                element: <div className="text-dove text-sm">Welcome back! Fetching your recent commissions...</div>,
            }
        ]
    }
]);

export default Router;
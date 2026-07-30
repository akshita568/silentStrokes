import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main.jsx";
import ErrorPage from "../pages/error/ErrorPage";
import RippleCursor from "../components/shared/RippleCursor.jsx";

// Public Pages for the Art Portfolio
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Portfolio from "../pages/portfolio/Portfolio"; 
import EventDetails from "../pages/eventDetails/EventDetails"; 
import Booking from "../pages/bookings/Booking";

// Shop, Cart, and Auth Routes Restored
import Shop from "../pages/shop/Shop";
import MyCart from "../pages/shop/MyCart";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import PaymentPage from "../pages/payment/PaymentPage";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFail from "../pages/payment/PaymentFail";
import Profile from "../pages/Profile/Profile";

const Router = createBrowserRouter([
    {
        path: "/",
        // Wrap RippleCursor and Main together so they both render on every page!
        element: (
            <>
                <RippleCursor />
                <Main />
            </>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/booking",
                element: <Booking />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/portfolio",
                element: <Portfolio />,
            },
            {
                path: "/shop",
                element: <Shop />,
            },
            {
                path: "/my-cart",
                element: <MyCart />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/payment/:_id",
                element: <PaymentPage />,
            },
            {
                path: "/payment/success/:tranId",
                element: <PaymentSuccess />,
            },
            {
                path: "/payment/fail/:transId",
                element: <PaymentFail />,
            }
        ],
    }
]);

export default Router;
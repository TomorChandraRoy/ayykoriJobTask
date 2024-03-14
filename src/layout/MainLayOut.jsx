import { Outlet } from "react-router-dom";
import Footer from "../components/shareComponents/Footer.";
import Navbar from './../components/shareComponents/Navbar';


const MainLayOut = () => {
    return (
        <div>
            <Navbar />
               <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayOut;
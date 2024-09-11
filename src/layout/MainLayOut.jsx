import { Outlet } from "react-router-dom";



const MainLayOut = () => {
    return (
        <div className="w-full min-h-screen">

               <Outlet />

        </div>
    );
};

export default MainLayOut;
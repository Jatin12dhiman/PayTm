import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            <span className="text-xl font-bold">PayTM App</span>
        </div>
        <div className="flex items-center">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mr-4">
                <div className="flex flex-col justify-center h-full text-lg">
                    U
                </div>
            </div>
            <button 
                onClick={handleLogout}
                className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium"
            >
                Logout
            </button>
        </div>
    </div>
}
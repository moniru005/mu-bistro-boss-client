import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56 flex justify-center items-center mx-auto"></progress>
    }
    if(user && isAdmin){
        return children;
    }


    return <Navigate state={{from:location}} to="/login" replace></Navigate>
};

export default AdminRoute;
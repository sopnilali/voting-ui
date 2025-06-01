import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../Utils/verifyToken";
import { useCurrentToken } from "../Redux/features/auth/authslice";
import { logout } from "../Redux/features/auth/authslice";

const ProtectedRoutes = ({ children, role }) => {
    const token = useSelector(useCurrentToken);
    const dispatch = useDispatch();

    let user;

    if (token) {
        user = verifyToken(token);
    }

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    // If role is specified and doesn't match user's role
    if (role && user?.role !== role) {
        dispatch(logout());
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoutes;
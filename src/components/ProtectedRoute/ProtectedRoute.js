import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute(props) {
	const { inAuth, element } = props;
	const { isAuth } = useContext(AuthContext);

	if (inAuth) {
		if (isAuth) {
			return <Navigate to="/" replace />;
		}
		return element;
	}

	if (!isAuth) return <Navigate to="/login" replace />;
	return element;
}
export default ProtectedRoute;

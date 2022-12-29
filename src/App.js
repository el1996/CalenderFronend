import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GitHubFetch from "./components/GitHubFetch";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Calendar } from "./pages/calendar/Calendar";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/register"
					element={<ProtectedRoute inAuth element={<Register />} />}
				/>
				<Route
					path="/login"
					element={<ProtectedRoute inAuth element={<Login />} />}
				/>
				<Route
					path="/auth/login/github"
					element={
						<ProtectedRoute inAuth element={<GitHubFetch />} />
					}
				/>
				<Route
					path="/"
					element={<ProtectedRoute element={<Calendar />} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

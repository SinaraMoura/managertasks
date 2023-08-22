import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import { getItem } from "./storage";

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route element={
                <>
                    <Header />
                    <ProtectedRoutes redirectTo='/' />
                </>
            }>
                <Route exact path="/todos" element={<Todo />} />
            </Route>
        </Routes>
    )
}
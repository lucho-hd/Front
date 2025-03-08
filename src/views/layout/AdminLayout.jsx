import { Outlet, Navigate } from "react-router-dom";

import AdminNavbar from "../../components/admin-navbar";

const isAdmin = true;

function AdminLayout() {
    return isAdmin ? (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <AdminNavbar />
                <div className="col-md-9 col-auto"> 
                    <Outlet />
                </div>
            </div>
        </div>
    ): (
        <Navigate to="/" />
    );
};

export default AdminLayout
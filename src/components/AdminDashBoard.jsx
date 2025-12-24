import { use, useContext, useEffect } from "react"
import Ct from "./Ct"
import { Link, useNavigate } from "react-router-dom"

const AdminDashBoard = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(() => {
    if (obj.state.role !== "admin" || obj.state.token == "") {
      navigate("/")
    }
  },[])
  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
    <div className="admin-dashboard-links">
      <Link className="admin-dashboard-card" to="/users">Manage Users</Link>
      <Link className="admin-dashboard-card" to="/docs">Manage Doctors</Link>
      <Link className="admin-dashboard-card" to="/penreq">Pending Approvals</Link>
    </div>
    </div>
  )
}

export default AdminDashBoard

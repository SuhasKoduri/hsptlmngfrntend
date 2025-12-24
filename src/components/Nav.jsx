import { useContext } from "react"
import { Link } from "react-router-dom"
import Ct from "./Ct"
const Nav = () => {
  let obj=useContext(Ct)
  return (
    <div className="nav">
        { obj.state.token=="" &&<Link to="/">Login</Link>}
        {obj.state.token=="" &&<Link to="/reg">Register</Link>}
        { obj.state.name!="" && <p>Logged in as:{obj.state.name}({obj.state.role})</p>}
        { obj.state.role=="admin" && <Link to="/admindashboard">Admin Dashboard</Link> }
        { obj.state.role=="doctor" && <Link to="/doctordashboard">Doctor Dashboard</Link> }
        { obj.state.role=="patient" && <Link to="/patientdashboard">Patient Dashboard</Link> }
        { obj.state.role=="patient" && <Link to="/precription">Precriptions</Link> }
        { obj.state.role=="recptionist" && <Link to="/recptionist">Recptionist Dashboard</Link> }
        { obj.state.role=="patient" && <Link to="/myappoint">My Appointments</Link> }
        {obj.state.role=="doctor" && <Link to="/allappoint">All Appointments</Link>}
        {obj.state.role=="doctor" && <Link to="/docprec">Suggested Precriptions</Link>}
        {obj.state.role=="doctor" && <Link to="/createprec">Create Precriptions</Link>}
        {obj.state.role=="recptionist" && <Link to="/receptionadd">Add Patient</Link>}
        {obj.state.role=="recptionist" && <Link to="/receptionappoint">Appointments</Link>}
        {obj.state.role=="admin" && <Link to="/users">Users</Link>}
        {obj.state.role=="admin" && <Link to="/docs">Doctors</Link>}
        {obj.state.role=="admin" && <Link to="/penreq">Pending Requests</Link>}
        { obj.state.token!="" && <Link to="/logout">Logout</Link> }
    </div>
  )
}

export default Nav

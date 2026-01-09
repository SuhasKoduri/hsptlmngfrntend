import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Ct from "./Ct";

const Nav = () => {
  const obj = useContext(Ct);
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      {/* User Info */}
      {obj.state.name !== "" && (
        <p>Logged in as:{obj.state.name} ({obj.state.role})</p>
      )}

      {/* Hamburger */}
      <div
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        {obj.state.token === "" && <Link to="/" onClick={() => setOpen(false)}>Login</Link>}
        {obj.state.token === "" && <Link to="/reg" onClick={() => setOpen(false)}>Register</Link>}

        {obj.state.role === "admin" && <Link to="/admindashboard" onClick={() => setOpen(false)}>Admin Dashboard</Link>}
        {obj.state.role === "doctor" && <Link to="/doctordashboard" onClick={() => setOpen(false)}>Doctor Dashboard</Link>}
        {obj.state.role === "patient" && <Link to="/patientdashboard" onClick={() => setOpen(false)}>Patient Dashboard</Link>}
        {obj.state.role === "patient" && <Link to="/precription" onClick={() => setOpen(false)}>Prescriptions</Link>}
        {obj.state.role === "patient" && <Link to="/myappoint" onClick={() => setOpen(false)}>My Appointments</Link>}

        {obj.state.role === "doctor" && <Link to="/allappoint" onClick={() => setOpen(false)}>All Appointments</Link>}
        {obj.state.role === "doctor" && <Link to="/docprec" onClick={() => setOpen(false)}>Suggested Prescriptions</Link>}
        {obj.state.role === "doctor" && <Link to="/createprec" onClick={() => setOpen(false)}>Create Prescription</Link>}

        {obj.state.role === "recptionist" && <Link to="/recptionist" onClick={() => setOpen(false)}>Receptionist Dashboard</Link>}
        {obj.state.role === "recptionist" && <Link to="/receptionadd" onClick={() => setOpen(false)}>Add Patient</Link>}
        {obj.state.role === "recptionist" && <Link to="/receptionappoint" onClick={() => setOpen(false)}>Appointments</Link>}

        {obj.state.role === "admin" && <Link to="/users" onClick={() => setOpen(false)}>Users</Link>}
        {obj.state.role === "admin" && <Link to="/docs" onClick={() => setOpen(false)}>Doctors</Link>}
        {obj.state.role === "admin" && <Link to="/penreq" onClick={() => setOpen(false)}>Pending Requests</Link>}

        {obj.state.token !== "" && <Link to="/logout" onClick={() => setOpen(false)}>Logout</Link>}
      </div>
    </nav>
  );
};

export default Nav;

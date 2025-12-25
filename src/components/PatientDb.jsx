import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Ct from "./Ct"

const PatientDb = () => {
  let navigate=useNavigate()
  let obj=useContext(Ct)

  useEffect(() => {
      const token = obj?.state?.token
      const role = obj?.state?.role
      if (!token || role !== "patient") navigate("/")
    },[obj?.state?.token, obj?.state?.role, navigate])


  return (
    <div className="patient-db">
        <h1>Patient Dashboard</h1>
        <Link to="/myappoint">My Appointments</Link>
        <Link to="/precription">Precriptions</Link>
    </div>
  )
}

export default PatientDb

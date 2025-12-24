import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Ct from "./Ct"

const PatientDb = () => {
  let navigate=useNavigate()
  let obj=useContext(Ct)

  useEffect(() => {
      if (obj.state.role !== "patient" || obj.state.token == "") {
        navigate("/")
      }
    },[])


  return (
    <div className="patient-db">
        <h1>Patient Dashboard</h1>
        <Link to="/myappoint">My Appointments</Link>
        <Link to="/precription">Precriptions</Link>
    </div>
  )
}

export default PatientDb

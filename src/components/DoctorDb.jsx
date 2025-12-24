import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Ct from './Ct'

const DoctorDb = () => {

let navigate=useNavigate()
let obj=useContext(Ct)

    useEffect(() => {
    if (obj.state.role !== "doctor" || obj.state.token == "") {
      navigate("/")
    }
  },[])

  return (
    <div className="doctor-db">
      <Link to="/allappoint">All Appointments</Link>
      <Link to="/createprec">Create Precriptions</Link>
      <Link to="/docprec">Suggested Precriptions</Link>
    </div>
  )
}

export default DoctorDb

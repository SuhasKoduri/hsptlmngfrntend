import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import { useState } from 'react'
import axios from 'axios'

const Receptionist = () => {

  let navigate=useNavigate()
  let obj=useContext(Ct)
  let [data,setData]=useState([])

  useEffect(() => {
      const token = obj?.state?.token
      const role = obj?.state?.role
      if (!token || role !== "recptionist") navigate("/")
      else{
        axios.get("https://hsptlmngbackend.onrender.com/allprec").then((res)=>{
          setData(res.data)
        })
      }
    },[obj?.state?.token, obj?.state?.role, navigate])


  return (
    <div className="receptionist-container">
      {
        <table className="receptionist-table">
          <tr className="receptionist-header">
            <th>DOCTOR ID</th>
            <th>PATIENT ID</th>
            <th>DIAGONSIS</th>
            <th>MEDICINE</th>
            <th>DOSAGE</th>
            <th>DURATION</th>
            <th>NOTES</th>
          </tr>
      {
        data.map((obj)=>{
          return(
            <tr className="receptionist-row">
              <td data-label="Doctor ID">{obj.did}</td>
              <td data-label="Patient ID">{obj.pid}</td>
              <td data-label="Diagnosis">{obj.diagonsis}</td>
              <td data-label="Medicine">{obj.medicines}</td>
              <td data-label="Dosage">{obj.dosage}</td>
              <td data-label="Duration">{obj.duration}</td>
              <td data-label="Notes">{obj.notes}</td>
              </tr>
          )
        })
      }
      </table>
    }
    </div>
  )
}

export default Receptionist

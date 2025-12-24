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
      if (obj.state.role !== "recptionist" || obj.state.token == "") {
        navigate("/")
      }
      else{
        axios.get("https://hsptlmngbackend.onrender.com/allprec").then((res)=>{
          setData(res.data)
        })
      }
    },[])


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
              <td>{obj.did}</td>
              <td>{obj.pid}</td>
              <td>{obj.diagonsis}</td>
              <td>{obj.medicines}</td>
              <td>{obj.dosage}</td>
              <td>{obj.duration}</td>
              <td>{obj.notes}</td>
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

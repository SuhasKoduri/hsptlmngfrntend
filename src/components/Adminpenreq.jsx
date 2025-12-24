import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Adminpenreq = () => {
    let [data,setData]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()

    useEffect(() => {
        if (obj.state.role !== "admin" || obj.state.token == "") {
          navigate("/")
        }
        axios.get("https://hsptlmngbackend.onrender.com/getpenapp").then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
      },[])

  return (
    <div className="adminpen-container">
        {
            
            data.length>0 && <div className="adminpen-table-wrapper"> <table className="adminpen-table" border={1}>
                <tr>
                    <th>Doctor ID</th>
                    <th>Patient ID</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                {
                    data.map((obj)=>{
                        return(
                            <tr>
                                <td>{obj.did}</td>
                                <td>{obj.pid}</td>
                                <td>{obj.date}</td>
                                <td>{obj.time}</td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
        }
        {
            data.length==0 && <h1 className="adminpen-empty">NO PENDING REQUESTS</h1>
        }
    </div>
  )
}

export default Adminpenreq

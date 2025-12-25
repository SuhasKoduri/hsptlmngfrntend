import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Adminpenreq = () => {
    let [data,setData]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()
    let [f,setF]=useState(false)

        useEffect(() => {
                const token = obj?.state?.token
                const role = obj?.state?.role
                if (!token || role !== "admin") navigate("/")
            },[obj?.state?.token, obj?.state?.role, navigate])

      useEffect(()=>{
        axios.get("https://hsptlmngbackend.onrender.com/getpenapprovals").then((res)=>{
            setData(res.data)
        })
      },[f])
      let func=(id)=>{
        axios.get(`https://hsptlmngbackend.onrender.com/accreq/${id}`).then(()=>{
            setF(!f)
        })
      }
  return (
    <div className="adminpen-container">
        {
            
            data.length>0 && <div className="adminpen-table-wrapper"> <table className="adminpen-table" border={1}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Request</th>
                    <th>Action</th>
                </tr>
                {
                    data.map((obj)=>{
                        return(
                            <tr>
                                <td>{obj._id}</td>
                                <td>{obj.name}</td>
                                <td>{obj.role}</td>
                                <td>{obj.request}</td>
                                <td> <button onClick={()=>func(obj._id)}>APPROVE</button> </td>
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

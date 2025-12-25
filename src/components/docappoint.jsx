import { useContext, useEffect,useState } from "react"
import Ct from "./Ct"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Docappoint = () => {
    let obj=useContext(Ct)
    let[data,setData]=useState([])
    let[f,setF]=useState(false)
    let navigate=useNavigate()
    let [data1,setData1]=useState([])
    useEffect(() => {
    const token = obj?.state?.token
    const role = obj?.state?.role
    if (!token || role !== "doctor") navigate("/")
  },[obj?.state?.token, obj?.state?.role, navigate])
  

    useEffect(()=>{
        axios.get(`https://hsptlmngbackend.onrender.com/allappoint/${obj.state._id}`).then((res)=>{
            setData(res.data)
        })},[f])


        useEffect(()=>{
        axios.get(`https://hsptlmngbackend.onrender.com/receptionpat/${obj.state._id}`).then((res)=>{
            setData1(res.data)
        })},[f])

  return (
    <div className="doc-appoint">
  {data.length + data1.length > 0 ? (
    <table className="doc-table">
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr key={e._id}>
            <td>{e.pid}</td>
            <td>{e.date}</td>
            <td>{e.time}</td>
            <td>{e.status}</td>
            <td>
              {e.status === "pending" && (
                <button
                  className="approve-btn"
                  onClick={() =>
                    axios.post("http://localhost:5000/updateappoints", { pid: e.pid, status: "approved" }).then(() => setF(!f))
                      .catch((err) => console.log(err))
                  }
                >
                  Approve
                </button>
              )}
            </td>
          </tr>
        ))}

        {data1.map((e) => (
          <tr key={e._id}>
            <td>{e._id}</td>
            <td>{e.date}</td>
            <td>{e.time}</td>
            <td>{e.status}</td>
            <td>
              {e.status === "pending" && (
                <button className="approve-btn" onClick={() => {axios.post("http://localhost:5000/updateappoint", { _id: e._id, status: "approved" }).then(() => setF(!f))
      .catch((err) => console.log(err));
  }}
>
  Approve
</button>

              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h3 className="empty">No Appointments Scheduled</h3>
  )}
</div>

  )
}

export default Docappoint

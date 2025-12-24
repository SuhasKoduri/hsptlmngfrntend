import axios from "axios"
import { useState ,useContext, useEffect } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"

const Myappoint = () => {
  let obj=useContext(Ct)
  let [info,setInfo]=useState({"pid":obj.state._id,"did":"","date":"","time":""})
  let[data,setData]=useState([])
  let[doc,setDoc]=useState([])
  let[f,setF]=useState(false)
  let navigate=useNavigate()


  
  useEffect(() => {
    if (obj.state.role !== "patient" || obj.state.token == "") {
      navigate("/")
    }
  },[])

    let fun=(e)=>{
      let{name,value}=e.target
      setInfo({...info,[name]:value})
    }


    useEffect(()=>{
        axios.get(`https://hsptlmngbackend.onrender.com/myappoint/${obj.state._id}`).then((res)=>{
            setData(res.data)
        })},[f])


    useEffect(()=>{
      axios.get(`https://hsptlmngbackend.onrender.com/doc`).then((res)=>{
        setDoc(res.data)
    })},[])

    let book=()=>{
      axios.post("https://hsptlmngbackend.onrender.com/bookappoint",info).then((res)=>{
        setF(!f)
    })}


  return (
    <div className="app-container">
      <h1 className="page-title">My Appointments</h1>
      {
        data.length>0 && <table border={1} className="app-table">
                  <tr>
                    <th>Doctor ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                  {
                    data.map((e)=>{
                      return (<tr>
                        <td>{e.did}</td>
                        <td>{e.date}</td>
                        <td>{e.time}</td>
                        <td>{e.status}</td>
                      </tr>)
                    })
                  }
                </table>
        }
        {
          data.length==0 && <h3 className="no-data">No Appointments Booked</h3>
        }
        <div className="form-card">
          <h3>Book Appointment</h3>
          <p>Select Doctor</p>
          <select className="form-select" onChange={fun} name="did" value={info.did}>
            <option value="" disabled>--Select Doctor--</option>
            {
              doc.map((e)=>{
                return <option value={e._id}>{e.name} - {e.specilization}</option>
              })
            }
          </select>
          <p>Select Date</p>
          <input className="form-input" type="date" onChange={fun} name="date" value={info.date} min={new Date().toISOString().split("T")[0]}/>
          <p>Select Time</p>
          <input className="form-input" type="time" onChange={fun} name="time" value={info.time}/>
          <br />
          <button className="primary-btn" onClick={book}>Book Now</button>
        </div>
    </div>
  )
}

export default Myappoint

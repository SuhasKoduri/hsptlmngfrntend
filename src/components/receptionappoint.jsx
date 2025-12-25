import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'
const Receptionappoint = () => {
  let navigate=useNavigate()
  let obj=useContext(Ct)
  let [pat,setPat]=useState([])
  let [doc,setDoc]=useState([])
  let [appoint,setAppoint]=useState([])
  let [f,setF]=useState(false)
  let [data,setData]=useState({did:"",pid:"",date:"",time:""})
  let fun=(e)=>{
    let{name,value}=e.target
    setData({...data,[name]:value})
  }

  let upd = (pid, status) => {
  axios.post("https://hsptlmngbackend.onrender.com/updateappoint", { _id: pid, status})
    .then((res) => {
      setF(!f)
      setAppoint(prev =>
        prev.map(a =>
          a.pid === pid ? { ...a, status } : a
        )
      );
    })
    .catch(err => console.log(err));
};


    useEffect(() => {
            const token = obj?.state?.token
            const role = obj?.state?.role
            if (!token || role !== "recptionist") navigate("/")
        },[obj?.state?.token, obj?.state?.role, navigate])

    useEffect(()=>{
        axios.get("https://hsptlmngbackend.onrender.com/receptionpat").then((res)=>{
            setPat(res.data)
        })
        axios.get("https://hsptlmngbackend.onrender.com/doc").then((res)=>{
            setDoc(res.data)
        })
        axios.get("https://hsptlmngbackend.onrender.com/allappoint").then((res)=>{
            setAppoint(res.data)
        })
    },[f])

        let del=(_id)=>{
            axios.delete(`https://hsptlmngbackend.onrender.com/deleteappoint/${_id}`).then((res)=>{
                setF(!f)
            })
        }
  return (
    <div className="reception-appoint">
    <div>
        <p>BOOK APPOINTMENTS</p>
        <p>Select Doctor</p>
        <select name="did" onChange={fun} value={data.did}>
            <option value="" disabled>Select Doctor</option>
        {
            doc.length>0 && doc.map((e)=>{
                return (<option value={e._id}>{e.name} - {e.specilization}</option>)
            })
        }
        </select>
        <p>Select Patient</p>
        <select name="pid" onChange={fun} value={data.pid}>
            <option value="" disabled>Select Patient</option>
        {
            pat.length>0 && pat.map((e)=>{
                return (<option value={e._id}>{e.name} - {e._id}</option>)
            })
        }
        </select>
        <p>Select Date</p>
        <input type="date" name="date" onChange={fun} value={data.date}/>
        <p>Select Time</p>
        <input type="time" name="time" onChange={fun} value={data.time}/>
        <button className='btn' onClick={()=>{
            axios.post("http://localhost:5000/receptionappoint",data).then((res)=>{
                setF(!f)
                setData({did:"",pid:"",date:"",time:""})
            })
        }}>Book Appointment</button>
    </div>

    <div>
        <h2>All Appointments</h2>
        {
            appoint.length>0 && <table border={1}>
                <tr>
                    <th>Patient ID</th>
                    <th>Doctor ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Delete</th>
                </tr>
                {
                    appoint.map((e)=>{
                        return (<tr>
                            <td>{e.pid}</td>
                            <td>{e.did}</td>
                            <td>{e.date}</td>
                            <td>{e.time}</td>
                            <td>
                               <select value={e.status} onChange={(ev) => upd(e._id, ev.target.value)}>
                                    <option value="" disabled>--Select Status--</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                </td>
                            <td>
                                <button className='btn' onClick={()=>del(e.pid)}>Delete</button>
                            </td>
                        </tr>)
                    })
                }
            </table>
        }
    </div>

    </div>
  )
}

export default Receptionappoint

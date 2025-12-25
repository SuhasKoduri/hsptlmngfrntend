import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Ct from "./Ct"
const Reg = () => {
  let [data,setData]=useState({"_id":"","name":"","specilization":"","role":"","pwd":"","consultfee":"","exp":""})
  let [msg,setMsg]=useState("")



   let navigate=useNavigate()
    let obj=useContext(Ct)


    useEffect(() => {
      const token = obj?.state?.token
      const role = obj?.state?.role
      if (!token) return
      if (role === "doctor") navigate("/doctordashboard")
      else if (role === "patient") navigate("/patientdashboard")
      else if (role === "admin") navigate("/admindashboard")
      else if (role === "recptionist") navigate("/recptionist")
    }, [obj?.state?.token, obj?.state?.role, navigate])



  let fun=(e)=>{
    let{name,value}=e.target
    setData({...data,[name]:value})
  }
  let reg=()=>{
    axios.post("https://hsptlmngbackend.onrender.com/reg",data).then((res)=>{
      setMsg(res.data.msg)
      if(res.data.msg=="Registration successful"){
        setData({"_id":"","name":"","specilization":"","role":"","pwd":"","consultfee":"","exp":""})
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className="reg-container">
    <div className="reg-card">
      <h1>{msg}</h1>
      <input className="reg-input" type="text" name="_id" placeholder="User ID" onChange={fun} value={data._id} />
      <input className="reg-input" type="text" name="name" placeholder="Name" onChange={fun} value={data.name} />
      <select className="reg-select" name="role" onChange={fun} value={data.role}>
        <option value="" disabled>Select Role</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="recptionist">Recptionist</option>
      </select>
      {data.role=="doctor" &&
      <select className="reg-select" name="specilization" onChange={fun} value={data.specilization}>
        <option value="" disabled>Select Specilization</option>
        <option value="cardiology">Cardiology</option>
        <option value="dermatology">Dermatology</option>
        <option value="neurology">Neurology</option>
        <option value="pediatrics">Pediatrics</option>
        <option value="psychiatry">Psychiatry</option>
        <option value="radiology">Radiology</option>
        <option value="general medicine">General Medicine</option>
        </select>
      }
      {
        data.role=="doctor" && <input className="reg-input doctor-extra" type="text" name="exp" placeholder="ENTER EXP IN MONTHS" onChange={fun} value={data.exp}/>
      }
      {
        data.role=="doctor" && <input className="reg-input doctor-extra" type="text" name="consultfee" placeholder="ENTER FEE IN RUPEES" onChange={fun} value={data.consultfee}/>
      }
      <input className="reg-input" type="password" name="pwd" placeholder="Password" onChange={fun} value={data.pwd} />
      <button className="reg-btn" onClick={reg}>Register</button>
    </div>
    </div>
  )
}

export default Reg

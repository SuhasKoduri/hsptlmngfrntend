import { useState, useContext, useEffect } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Ct from "./Ct";
const Login = () => {
    let [data,setData]=useState({"_id":"","pwd":""})
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
    }, [obj?.state?.token, obj?.state?.role])

    let fun=(e)=>{
        let{name,value}=e.target
        setData({...data,[name]:value})
    }
    let login=()=>{
        axios.post("https://hsptlmngbackend.onrender.com/login",data).then((res)=>{
        try{
          localStorage.setItem('ct', JSON.stringify(res.data))
        }catch(e){ }
        obj.stateUpd(res.data)
            setMsg(res.data.msg)
            if(res.data.role=="patient"){
                navigate("/patientdashboard")
            }
            else if(res.data.role=="doctor"){
                navigate("/doctordashboard")
            }
            else if(res.data.role=="admin"){
                navigate("/admindashboard")
            }
            else if(res.data.role=="recptionist"){
                navigate("/recptionist")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className="login-container">
    <div className="login-card">
        <h1>{msg}</h1>
        <input className="login-input" type="text" name="_id" placeholder="User ID" onChange={fun} value={data._id} />
        <input className="login-input" type="password" name="pwd" placeholder="Password" onChange={fun} value={data.pwd} />
        <button className="login-btn" onClick={login}>Login</button>
    </div>
    </div>
  )
}

export default Login

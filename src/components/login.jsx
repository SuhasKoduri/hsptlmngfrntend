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
    if (obj.state.role == "doctor" || obj.state.token != "") {
      navigate("/doctordashboard")
    }
    else if (obj.state.role == "patient" || obj.state.token != "") {
      navigate("/patientdashboard")
    }
    else if (obj.state.role == "admin" || obj.state.token != "") {
      navigate("/admindashboard")
    }
    else if (obj.state.role == "recptionist" || obj.state.token != "") {
      navigate("/recptionist")
    }
    else{
        navigate("/")
    }
  },[])

    let fun=(e)=>{
        let{name,value}=e.target
        setData({...data,[name]:value})
    }
    let login=()=>{
        axios.post("https://hsptlmngbackend.onrender.com/login",data).then((res)=>{
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

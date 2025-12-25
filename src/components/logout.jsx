import { useContext, useEffect } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    let navigate=useNavigate()
    let obj=useContext(Ct)
    useEffect(()=>{
      try{ localStorage.removeItem('ct') }catch(e){}
      obj.stateUpd({"token":"","name":"","role":"","_id":""})
      navigate("/")
    },[])
  return (
    <div>

    </div>
  )
}

export default Logout

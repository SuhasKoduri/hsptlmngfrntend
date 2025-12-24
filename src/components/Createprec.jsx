import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"

const Createprec = () => {
    let obj=useContext(Ct)
    let navigate=useNavigate()

    useEffect(() => {
    if (obj.state.role !== "doctor" || obj.state.token == "") {
      navigate("/")
    }
  },[])


    let[data,setData]=useState([])
    let [info,setInfo]=useState({"pid":"","diagonsis":"","medicines":"","dosage":"","duration":"","notes":"","did":obj.state._id})
    useEffect(()=>{
        axios.get(`https://hsptlmngbackend.onrender.com/getpat/${obj.state._id}`).then((res)=>{
            setData(res.data)
        })
    },[])
    let fun=(e)=>{
        let{name,value}=e.target
        setInfo({...info,[name]:value})
    }

    let create=()=>{
        axios.post("https://hsptlmngbackend.onrender.com/createprec",info).then((res)=>{
            setInfo({"pid":"","diagonsis":"","medicines":"","dosage":"","duration":"","notes":"","did":obj.state._id})
        })
    }
  return (
    <div className="create-prec-container">
        <p>Select Patient</p>
        <select onChange={fun} name="pid" value={info.pid}>
            <option value="" disabled>Select Patient</option>
            {
                data.map((e)=>{
                    return (<option value={e.pid}> {e.pid}</option>)
                })
            }
        </select>
        <p>Enter If Any Diagonsis Requires</p>
        <input type="text" onChange={fun} name="diagonsis" value={info.diagonsis} placeholder="ENTER DIAGONSIS" />
        <p>Add Medicine</p>
        <input type="text" onChange={fun} name="medicines" value={info.medicines} placeholder="ENTER MEDICINES" />
        <p>Dosage</p>
        <input type="text" onChange={fun} name="dosage" value={info.dosage} placeholder="ENTER DOSAGE Eg.1-1-1" />
        <p>Duration</p>
        <input type="text" onChange={fun} name="duration" value={info.duration} placeholder="ENTER DURATION" />
        <p>Additional Notes</p>
        <input type="text" onChange={fun} name="notes" value={info.notes} placeholder="ENTER NOTES" />
        <button onClick={create}>Submit Precription</button>
    </div>
  )
}
export default Createprec

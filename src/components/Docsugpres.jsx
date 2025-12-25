import axios from "axios"
import { useContext, useEffect,useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"

const Docsugpres = () => {
    let [data,setData]=useState([])
    let [f,setF]=useState(false)
    let obj=useContext(Ct)

    let navigate=useNavigate()

    useEffect(() => {
    const token = obj?.state?.token
    const role = obj?.state?.role
    if (!token || role !== "doctor") navigate("/")
  },[obj?.state?.token, obj?.state?.role, navigate])


    useEffect(() => {
    axios.get(`https://hsptlmngbackend.onrender.com/docprec/${obj.state._id}`)
         .then(res => setData(res.data))
}, [!f])


  return (
    <div>
        {
            data.length>0 && data.map((e)=>{
                return (<div className="doc-sug-pres-card">
                    <h3>Patient ID: {e.pid}</h3>
                    <p>Diagonsis: {e.diagonsis}</p>
                    <p>Medicines: {e.medicines}</p>
                    <p>Dosage: {e.dosage}</p>
                    <p>Duration: {e.duration}</p>
                    <p>Notes: {e.notes}</p>
                </div>)
            })
        }
    </div>
  )
}

export default Docsugpres

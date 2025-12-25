import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
const Precriptions = () => {
    let obj=useContext(Ct)
    let [data,setdata]=useState([])
    let navigate=useNavigate()

    useEffect(() => {
    if (obj.state.role !== "patient" || obj.state.token == "") {
      navigate("/")
    }
  },[])

    useEffect(()=>{
        axios.get(`https://hsptlmngbackend.onrender.com/getprec/${obj.state._id}`).then((res)=>{
            setdata(res.data)
        })  
    },[])
  return (
    <div>
        {
            data.length>0 && data.map((e)=>{
                return (<div className='prec-card'>
                    <p>Doctor ID: {e.did}</p>
                    <p>Diagnosis: {e.diagonsis}</p>
                    <p>Medicines: {e.medicines}</p>
                    <p>Dosage: {e.dosage}</p>
                    <p>Duration: {e.duration}</p>
                    <p>Notes: {e.notes}</p>
                </div>)
            })
        }
        {
          data.length==0 && <h2 className="no-prescriptions">NO PRECRIPTIONS ARE SUGGESTED YET</h2>
        }
    </div>
  )
}

export default Precriptions

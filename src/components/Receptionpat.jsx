import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const Receptionpat = () => {

  let navigate=useNavigate()
  let obj=useContext(Ct)
  let [data,setdata]=useState({"_id":"","name":"","age":"","gender":"","phnno":""})
  let [patinfo,setPatinfo]=useState([])
  let [f,setF]=useState(false)

  let fun=(e)=>{
    let {name,value}=e.target
    setdata({...data,[name]:value})
  }

    useEffect(() => {
                        const token = obj?.state?.token
                        const role = obj?.state?.role
                        if (!token || role !== "recptionist") navigate("/")
        },[obj?.state?.token, obj?.state?.role, navigate])

    useEffect(()=>{
        axios.get("https://hsptlmngbackend.onrender.com/receptionpat").then((res)=>{
            setPatinfo(res.data)
        })
    },[f])

    let addpat=()=>{
        axios.post("https://hsptlmngbackend.onrender.com/recaddpat",data).then((res)=>{
              if(res.data.msg=="Patient added successfully"){
                setdata({"_id":"","name":"","age":"","gender":"","phnno":""})
            }
            setF(!f)
        })
    }

  return (
    <div className="page">
        <div className="card">
            <p className="card add-patient">ADD NEW PATIENT</p>
            <div className="form-grid">
            <input type="text" placeholder='Enter Mail_id' name='_id' value={data._id} onChange={fun}/>
            <input type="text" placeholder='Enter Name' name='name' value={data.name} onChange={fun}/>
            <input type="text" placeholder='Enter Age' name='age' value={data.age} onChange={fun}/>
            <input type="text" placeholder='Enter Gender' name='gender' value={data.gender} onChange={fun}/>
            <input type='text' placeholder='Enter Phone Number' name='phnno' value={data.phnno} onChange={fun}/>
            </div>
            <button className="btn" onClick={addpat}>Add Patient</button>
        </div>

        {
            patinfo.length>0 && <div className="card"> <div className="table-wrapper"> <p className="card add-patient">Patients List</p> <table border={1}>
                <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                </tr>
                {
                    patinfo.map((e)=>{
                        return (<tr>
                            <td>{e._id}</td>
                            <td>{e.name}</td>
                            <td>{e.age}</td>
                            <td>{e.gender}</td>
                            <td>{e.phnno}</td>
                        </tr>)
                    })
                }
            </table>

            { (patinfo.length==0) &&
                <h3 className="empty">No Patients Added</h3>}
            </div>
             </div>
        }
    </div>
  )
}

export default Receptionpat

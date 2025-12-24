import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Admindocs = () => {
  const obj = useContext(Ct)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [f, setF] = useState(false)

  useEffect(() => {
    if (!obj.state.role || !obj.state.token) navigate("/")
    axios.get("https://hsptlmngbackend.onrender.com/alldr")
      .then((res) =>{
       setData(res.data)
       
    }).catch(err => console.log(err))

  }, [f, obj.state.role, obj.state.token, navigate])

  const fun = (id) => {
    axios.get(`https://hsptlmngbackend.onrender.com/deluser/${id}`)
      .then(() => setF(!f))
  }

  return (
    <div className="adminusers-container">
      {data.length === 0 && <p className="adminusers-empty">No users found</p>}

      {data.length > 0 && <div className="adminusers-table-wrapper">
        <table border={1} className="adminusers-table">
          <tr>
            <th>EMAIL</th>
            <th>NAME</th>
            <th>ROLE</th>
            <th>Specilization</th>
            <th>Consultation Fees</th>
            <th>Experience(in months)</th>
            <th>ACTION</th>
          </tr>

          {data.map(obj => (
            <tr key={obj._id}>
              <td>{obj._id}</td>
              <td>{obj.name}</td>
              <td>{obj.role}</td>
              <td>{obj.specilization}</td>
              <td>{obj.consultfee}</td>
              <td>{obj.exp}</td>
              <td>
                <button className="adminusers-delete-btn" onClick={() => fun(obj._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
        </div>}
    </div>
  )
}

export default Admindocs
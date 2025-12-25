import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Reg from './components/Reg'
import Nav from './components/Nav'
import Ct from './components/Ct'
import { useState, useEffect } from 'react'
import PatientDb from './components/PatientDb'
import DoctorDb from './components/DoctorDb'
import AdminDashBoard from './components/AdminDashBoard'
import Recptionist from './components/Receptionist'
import Myappoint from './components/Myappoint'
import './App.css'
import Logout from './components/logout'
import Precriptions from './components/precriptions'
import Docappoint from './components/docappoint'
import Createprec from './components/Createprec'
import Docsugpres from './components/Docsugpres'
import Receptionpat from './components/Receptionpat'
import Receptionappoint from './components/receptionappoint'
import Adminusers from './components/Adminusers'
import Admindocs from './components/Admindocs'
import Adminpenreq from './components/Adminpenreq'
const App = () => {
  let [state,setstate]=useState(() => {
    try{
      const stored = localStorage.getItem('ct')
      return stored ? JSON.parse(stored) : {"token":"","name":"","role":"","_id":""}
    }catch(e){
      return {"token":"","name":"","role":"","_id":""}
    }
  })

  let stateUpd = (obj) => {
    setstate(prev => {
      const next = { ...prev, ...obj }
      try{ localStorage.setItem('ct', JSON.stringify(next)) }catch(e){}
      return next
    })
  };
  let obj={"state":state,"stateUpd":stateUpd}
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'ct') {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : { token: '', name: '', role: '', _id: '' }
          setstate(next)
        } catch (err) { }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return (
    <div className='con'>
      <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/patientdashboard' element={<PatientDb />} />
          <Route path='/doctordashboard' element={<DoctorDb />} />
          <Route path='/admindashboard' element={<AdminDashBoard />} />
          <Route path='/recptionist' element={<Recptionist />} />
          <Route path='/myappoint' element={<Myappoint />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/precription' element={<Precriptions/>} />
          <Route path='/allappoint' element={<Docappoint/>} />
          <Route path='/createprec' element={<Createprec/>} />
          <Route path='/docprec' element={<Docsugpres/>} />
          <Route path="/receptionadd" element={<Receptionpat/>} />
          <Route path="/receptionappoint" element={<Receptionappoint/>} />
          <Route path='/users' element={<Adminusers/>}/>
          <Route path='/docs' element={<Admindocs/>}/>
          <Route path='/penreq' element={<Adminpenreq/>}/>
        </Routes>
        </Ct.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App

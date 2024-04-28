import Signup from './pages/Signup'
import Signin from './pages/Signin'
import HPSignup from './pages/HPSignup'
import HPSignin from './pages/HPSignin'
import Patientdashboard from './pages/Patientdashboard.jsx'
import HPdashboard from './pages/HPdashboard.jsx'
import Access from './pages/Access.jsx'
import HPAccess from './pages/HPAccess.jsx'
import Settings from './pages/Settings.jsx'
import HPPatientlist from './pages/HPPatientlist.jsx'
import Appointments from './pages/Appointments.jsx'
import HPAppointments from './pages/HPAppointments.jsx'
import Prescriptions from './pages/Prescriptions.jsx'
import HPPrescriptions from './pages/HPPrescriptions.jsx'
import MedicalRecords from './pages/MedicalRecords.jsx'
import HPMedicalRecords from './pages/HPMedicalRecords.jsx'
import HPPatientDashboard from './pages/HPPatientDashboard.jsx'
import Notfound from './pages/Notfound.jsx'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./assets/css/bootstrap.min.css"
import "./assets/css/dashboard.css"
import "./assets/css/mdb.min.css"
import "./assets/css/style.css"

function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/hpsignup" element={<HPSignup />} />
        <Route path="/hpsignin" element={<HPSignin />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/patientdashboard" element={<Patientdashboard />} />
        <Route path="/hpdashboard" element={<HPdashboard />} />
        <Route path="/access" element={<Access />} />
        <Route path="/hpaccess" element={<HPAccess />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/hpappointments" element={<HPAppointments />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/hpprescriptions" element={<HPPrescriptions />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/hp-medical-records" element={<HPMedicalRecords />} />
        <Route path="/hppatientlist" element={<HPPatientlist />} />
        <Route path="/hp-patient-dashboard" element={<HPPatientDashboard />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App

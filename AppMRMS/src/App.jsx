import Signup from './pages/Signup'
import Signin from './pages/Signin'
import HPSignup from './pages/HPSignup'
import HPSignin from './pages/HPSignin'
import Patientdashboard from './pages/Patientdashboard.jsx'
import HPdashboard from './pages/HPdashboard.jsx'
import Requests from './pages/Requests.jsx'
import Profile from './pages/Profile.jsx'
import Access from './pages/Access.jsx'
import Settings from './pages/Settings.jsx'
import Patientlist from './pages/HPPatientlist.jsx'
import Appointments from './pages/Appointments.jsx'
import Prescriptions from './pages/Prescriptions.jsx'
import Notfound from './pages/Notfound.jsx'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/hpsignin" element={<HPSignin />} />
        <Route path="/hpsignup" element={<HPSignup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/patientdashboard" element={<Patientdashboard />} />
        <Route path="/hpdashboard" element={<HPdashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/access" element={<Access />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/patientlist" element={<Patientlist />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App

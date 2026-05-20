import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import  LoginLanding  from './pages/LoginLanding'
import  Layout  from './pages/Layout'
import  Dashboard  from './pages/Dashboard'
import  Employees  from './pages/Employees'
import  Leave  from './pages/Leave'
import  Attendance  from './pages/Attendance'
import  PaySlips  from './pages/PaySlips'
import  Setting  from './pages/Setting'
import  PrintPaySlip  from './pages/PrintPaySlip'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        {/*Login Routes*/}
        <Route path="/login" element={<LoginLanding />} />
        <Route path='/login/admin' element={ <LoginForm role="admin" title="Admin Portal" subtitle="Login to your manage organization" /> } />
        <Route path='/login/employee' element={ <LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account" /> } />

        {/*Pages Routes*/}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/employee" element={<Employees />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payslips" element={<PaySlips />} />
          <Route path="/settings" element={<Setting />} />
        </Route>

        <Route path="/print/payslips/:id" element={<PrintPaySlip />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App
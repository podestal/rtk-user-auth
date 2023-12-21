import React from "react"
import { Routes, Route } from "react-router-dom"
import Public from "./components/Public"
import Layout from "./components/Layout"
import Login from "./features/auth/Login"
import RequireAuth from "./features/auth/RequireAuth"
import Welcome from "./features/auth/Welcome"

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public Routes */}
        <Route index element={<Public />}/>
        <Route path="login" element={<Login />} />
        {/* Public Routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App

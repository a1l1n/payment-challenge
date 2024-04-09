import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "./Routes/Home";
import { Login } from './Routes/Login';
import { SignUp } from './Routes/SignUp';
import { Payment } from "./Routes/Payment";

import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/:id/edit" element={<Payment />} />
    </Routes>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../Components/Navbar';
import { Filters } from '../Components/Filters';
import { AllPayments } from '../Components/AllPayments';

import Styles from "./Home.module.css"

export const Home = () => {
  // States
  const [filters, setFilters] = useState({ sortBy: '', orderBy: '', filterByType: '' });

  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("username");

  // Hooks
  const navigate = useNavigate();

  // Functions
  function checkAuthentication() {
    const cookies = document.cookie.split(';');
    if (!cookies || cookies[0] === "") {
      // Redirigir al usuario al login
      navigate("/");
    }
    return cookies;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleFilterChange = (filters) => {
    setFilters(filters);
  };

  return (
    <div className={Styles.home_container}>
      <Navbar userName={userName} />
      <div className={Styles.home_payments_container}>
        <Filters onFilterChange={handleFilterChange} />
        <AllPayments userId={userId} filters={filters} />
      </div>
    </div>
  )
}

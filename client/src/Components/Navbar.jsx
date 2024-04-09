import React from 'react';
import { Logo } from '../assets/Logo';
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

const logOutUrl = import.meta.env.VITE_LOGOUT_URL
// Habilitar el intercambio de cookies
axios.defaults.withCredentials = true;

export const Navbar = () => {
  const getName = sessionStorage.getItem("username");
  
  // Hooks 
  const navigate = useNavigate();

  // Functions
  const logOut = async () => {
    const response = await axios(logOutUrl);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    navigate("/");
  }

  return (
    <NavbarContainer>
      <LogoBox>
        <NavLink to="/home">
          <Logo />
        </NavLink>
        <Welcome>Welcome, {getName}</Welcome>
      </LogoBox>

      <Buttons
        onClick={logOut}>
        <BiLogOut />
          Log out
      </Buttons>

    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
width: 99.4%;
height: 6rem;
display: flex;
justify-content: space-around;
align-items: center;
background-color: #DCD9FF;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
outline: none;
box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
overflow: hidden
`

const LogoBox = styled.div`
display: flex;
`

const Welcome = styled.h1`
font-size: 25px;
color: #0c41b2;
margin-left: 2rem
`

const Buttons = styled.button`
height: 4rem;
width: 5rem;
font-size: 15px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: #0c41b2;
box-shadow: 0px 6px 8px -8px rgba(0, 0, 0, 0.568);
`
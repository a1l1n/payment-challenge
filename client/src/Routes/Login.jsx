import { BigLogo } from '../assets/BigLogo';
import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

const loginUrl = import.meta.env.VITE_LOGIN_URL;
// Habilitar el intercambio de cookies
axios.defaults.withCredentials = true;

export const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  // States
  const [showPsw, setShowPsw] = useState(false);

  // Functions
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const emailValue = email.current.value;
      const passwordValue = password.current.value;

      const response = await axios.post(loginUrl, {
          email: emailValue,
          password: passwordValue
      });

      const userId = sessionStorage.setItem('userId', response.data.id);
      const userName = sessionStorage.setItem("username", response.data.fullName)
      if (response) {
        navigate("/home")
      }

    } catch (error) {
      console.log("There was a problem log in up a new user: ", error.response.data.message)
      const errorMessage = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: errorMessage
      })
    }
  };

  return (
    <Container>
        <Title>
          <BigLogo />
        </Title>

        <Form onSubmit={handleLogin}>  
          <Mail
          type="email"
          ref={email}
          placeholder="Email"
          required
          />

            <Psw> 
              <LoginPsw
              type={showPsw ? "text" : "password"}
              ref={password}
              placeholder="Password"
              required
              />
              <Eye
              onClick={() => setShowPsw(!showPsw)}>
                { showPsw ? <IoEyeOutline/> : <IoEyeOffOutline className='loginInIc'/>}
              </Eye>
            </Psw>
            
            <LoginBtn>
              Log in!
            </LoginBtn>

            <div>
              <h6>You don't have an account?</h6>
              <NavLink to="/signup">
                <SignupBtn>
                  Sign Up
                </SignupBtn>
              </NavLink>
            </div>

        </Form>
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`

const Title = styled.div`
    width: 25%;
    background-color: white;
    height: 8rem;
    padding: 3rem;
    margin-top: 8rem;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`
const Form = styled.form`
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    border-radius: 5px;
    background-color: #d9d9d933;
    box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`
const Mail = styled.input`
    width: 250px;
    height: 2rem;
    margin: 1rem 0;
    border: none;
    outline: none;
    border-bottom: 1px solid gray;
    background-color: transparent;
    letter-spacing: 0.1rem;
`

const Psw = styled.div`
    width: 250px;
    height: 2rem;
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
    border-bottom: 1px solid gray;
`
const LoginPsw = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
`
const Eye = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`
const LoginBtn = styled.button`
    width: 8rem;
    height: 2.5rem;
    color: white;
    transition: 0.5s;
    background-color: #0c41b2;

    &:hover {
      transition: 0.5s;
      background-color: #0c41b2cb;
    }
`
const SignupBtn = styled.button`
    width: 8rem;
    height: 2.5rem;
    color: white;
    transition: 0.5s;
    background-color: #dcd9ff;
    border-radius: 18px;
    color:#0c41b2;
    box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`
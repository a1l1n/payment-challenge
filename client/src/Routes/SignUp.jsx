import React, { useState } from 'react';
import { Logo } from '../assets/Logo';
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

const signUpUrl = import.meta.env.VITE_SIGNUP_URL;

// Habilitar el intercambio de cookies
axios.defaults.withCredentials = true;

export const SignUp = () => {
  // Hooks
  const navigate = useNavigate();

  // States
  const [errors, setErrors] = useState({});
  const [showPsw, setShowPsw] = useState(false);
  const [user, setUser] = useState({
      fullName: "",
      email: "",
      password: "",
      password2: ""
  });

  // Functions 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    
    if (Object.keys(errors).length === 0) {
      try {
          const response = await axios.post(signUpUrl, user);
          sessionStorage.setItem('userId', response.data.id);
          sessionStorage.setItem("username", response.data.fullName);
          Swal.fire({
            icon: "success",
            title: "Successful Registration"});
          setUser({
            fullName: "",
            email: "",
            password: "",
            password2: ""
          });
          // Redirigir al home
          navigate("/home");
      } catch (error) {
          console.log("There was a problem signin up a new user: ", error.response.data);
          const errorMessage = error.response.data.message;
          Swal.fire(errorMessage);
      }
    } else {
      setErrors(errors);
    }
  };


  const validate = () => {
    let errors = {};
    if (!user.fullName.trim()) {
      errors.fullName = 'Username is required';
    };
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'A valid email is required';
    };

    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 8) {
      errors.password = 'Password must have at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(user.password)) {
      errors.password = 'Password must contain at least one uppercase letter and one number';
    };

    if (!user.password2) {
      errors.password2 = 'Password is required';
    } else if (user.password2 !== user.password) {
      errors.password2 = "Passwords don't match";
    }

    return errors;
  }

  return (
    <Container> 
      <Title>
        <Sign>sign up</Sign>
        <Logo />
      </Title>

      <Form onSubmit={handleSubmit}> 
        <Input
        type="text"
        name="fullName"
        value={user.fullName}
        onChange={handleChange}
        placeholder='Full Name'
        required
        />
        <Error>{errors.fullname && <Text>{errors.fullname}</Text>}</Error>

        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required        
        />
        <Error>{errors.email && <Text>{errors.email}</Text>}</Error>

        <Psw>
          <LoginPsw
            id="password"
            type={showPsw ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <Eye
          onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <IoEyeOutline/> : <IoEyeOffOutline className='loginInIc'/>}
          </Eye>
        </Psw>
          <Error>{errors.password && <Text>{errors.password}</Text>}</Error>

        <Psw>
          <LoginPsw 
            id="password2"
            type={showPsw ? "text" : "password"}
            name="password2"
            value={user.password2}
            onChange={handleChange}
            placeholder="Confirm Password"
            required        
          />
          <Eye
          onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <IoEyeOutline/> : <IoEyeOffOutline className='loginInIc'/>}
          </Eye>
        </Psw>
          <Error>{errors.password2 && <Text>{errors.password2}</Text>}</Error>

        <Button>
          Sign Up
        </Button>  
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20rem;
    background-color: white;
    color: #0c41b2;
    height: 8rem;
    padding: 2rem;
    margin-top: 8rem;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`

const Sign = styled.h1`
    margin: 0;
`

const Form = styled.form`
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 5px;
    background-color: #d9d9d933;
    box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`
const Input = styled.input`
    width: 250px;
    height: 2rem;
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

const Button = styled.button`
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

const Error = styled.div`
    font-size: 16px;
    color: red;
    margin: 1rem;
    width: 260px;
`

const Text = styled.p`
    margin: 0;
    font-size: 14px
`




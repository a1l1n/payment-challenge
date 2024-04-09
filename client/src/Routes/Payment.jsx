import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { Navbar } from '../Components/Navbar';
import { useNavigate, useParams } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import 'react-datepicker/dist/react-datepicker.css';

import "../App.css"
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import Styles from "./Payment.module.css"

const newPaymentUrl = import.meta.env.VITE_POST_PAYMENT_URL;

export const Payment = () => {
  //Global Data
  const userId = sessionStorage.getItem('userId')

  // Hooks
  const navigate = useNavigate();
  const params = useParams();

  //States
  const [editing, setEditing] = useState(false)
  const [payment, setPayment] = useState({
    amount: "",
    date: null,
    type: "",
    addresse: "",
    userId: "",
    description: ""
  });

  // Functions
  function checkAuthentication() {
    const cookies = document.cookie.split(';');
    if (!cookies || cookies[0] === "") {
      // Redirigir al usuario al login
      navigate("/");
    }
    return cookies;
  };

  const loadPayment = async (id) => {
    const response = await axios(`${newPaymentUrl}/${id}`);
    const payment = response.data
    setPayment({
      amount: payment.amount,
      date: payment.date,
      type: payment.type,
      addresse: payment.addresse,
      userId: payment.userId,
      description: payment.description
    });
    setEditing(true)
  }
  
  useEffect(() => {
    // SEGUIR ACÁ
    if (params.id) {
      loadPayment(params.id)
    }
  }, [params.id])

  useEffect(() => {
    checkAuthentication();
  }, []);


  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setPayment({
      ...payment,
      date: date 
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    if (editing) {
      const formattedDate = format(payment.date, 'dd/MM/yyyy');
      const paymentWithUserId = {
        ...payment,
        date: formattedDate,
        userId: userId
      }
      await axios.put(`${newPaymentUrl}/${params.id}`, paymentWithUserId);

      Swal.fire({
        icon:"success",
        title: "Successful Registration"});

      setPayment({
        amount: "",
        date: null,
        type: "",
        addresse: "",
        userId: "",
        description: ""
      });
      // Redirigir al home
      navigate('/home');

    } else {
      try {
        const formattedDate = format(payment.date, 'dd/MM/yyyy');
  
        const paymentWithUserId = {
          ...payment,
          date: formattedDate,
          userId: userId
        }
        
        await axios.post(newPaymentUrl, paymentWithUserId);
        
        Swal.fire({
          icon:"success",
          title: "Successful Registration"});
  
        setPayment({
          amount: "",
          date: null,
          type: "",
          addresse: "",
          userId: "",
          description: ""
        });
    
        // Redirigir al home
        navigate('/home');
        
      } catch (error) {
        const errorMessage = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage
        })
        console.log("There was a problem creating a new payment: ", error.response.data.message);
      };
    }
  }

  return (
    <Container>
      <Navbar />
      <Header>
        <Title>Adding New Payment</Title>
      </Header>

      <Form 
      onSubmit={handlePaymentSubmit}>
      
      <Data>
      <Input
      type="text"
      name="addresse"
      placeholder='* Addresse'
      value={payment.addresse}
      onChange={handlePaymentChange}
      required
      />

      <DateContainer>
        <div>* Date</div>
        <DatePicker 
          selected={payment.date}
          className="pay-datepiker"
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
        />
        <IoCalendarOutline />
      </DateContainer>

      <Select
      name="type"
      value={payment.type}
      onChange={handlePaymentChange}
      >
        <option>* Type</option>
        <option value="CASH">Cash</option>
        <option value="DEBIT">Debit</option>
        <option value="CREDIT">Credit</option>
        <option value="BANK TRANSFER">Bank Transfer</option>
      </Select>

      <Input
      type="number"
      name="amount"
      value={payment.amount}
      onChange={handlePaymentChange}
      placeholder="* Amount"
      min="0"
      step="0.01"
      required
      />
      </Data>

      <Text>
        <label>Description (optional)</label>
        <TextArea
          name="description"
          cols="30"
          rows="10"
          maxLength="500"
          onChange={handlePaymentChange}  >
        </TextArea> 
      </Text>

      <Button>Create!</Button>

      </Form>
    </Container>
  )
};

const Container = styled.div`
width: 100vw;
height: auto;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Header = styled.div`
width: 60%;
height: 2rem;
display: flex;
align-items: center;
justify-content: space-around;
margin-top: 3rem;
padding: 2rem;
color: #0c41b2;
background-color: white;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`

const Title = styled.h1`
margin:0;
font-size: 35px;
`

const Form = styled.form`
width: 60%;
min-height: 18rem;
display: flex;
flex-wrap: wrap;
flex-direction: row;
align-items: center;
justify-content: space-around;
padding: 2rem;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
background-color: white;
border-top: 2px solid rgb(236, 236, 236);
box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`
const Data = styled.div`
display: flex;
flex-direction: column;
width: 220px;
`

const Input = styled.input`
background-color: transparent;
border: none;
outline: none;
border-bottom: 1px solid #DCD9FF;
font-weight: 500;
margin: 1rem 0;
`

const Select = styled.select`
border: none;
outline: none;
background-color: transparent;
border-bottom: 1px solid #DCD9FF;
margin: 1rem 0;
`

const DateContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 1rem 0;
border-bottom: 1px solid #DCD9FF;
font-weight: 500;
`
const Text = styled.div`
display: flex;
flex-direction: column;
text-align: left;
`
const TextArea = styled.textarea`
background-color: transparent;
outline: none;
border-radius: 10px;
border: 1px solid #DCD9FF;
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


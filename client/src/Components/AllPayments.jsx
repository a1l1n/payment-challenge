import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";
import Styles from "./AllPayments.module.css"
import 'react-datepicker/dist/react-datepicker.css';

const getPaymentsUrl = import.meta.env.VITE_GET_PAYMENTS_URL;
const editPaymentsUrl = import.meta.env.VITE_EDIT_PAYMENTS_URL;

export const AllPayments = ({ userId, filters }) => {
  const navigate = useNavigate();
  //States
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedPayments, setSortedPayments] = useState([]);
  
  // Fetching payments
  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const response = await axios.get(getPaymentsUrl + `${userId}/payments`);
        const paymentsWithEditing = response.data.map(payment => ({ ...payment, editing: false }));
        setPayments(paymentsWithEditing);
      } catch (error) {
        console.log('Error fetching payments:', error.message);
      }
    };
    fetchAllPayments();
  }, [userId]);

  useEffect(() => {

  })

  // Filtrando la data en tiempo real
  useEffect(() => {
    if (payments.length > 0) {
    let filteredPayments = payments.filter((payment) => {
      const type = payment.type ? payment.type.toLowerCase() : '';
      const addresse = payment.addresse ? payment.addresse.toLowerCase() : '';
      const date = payment.date ? payment.date.toLowerCase() : '';
      const description = payment.description ? payment.description.toLowerCase() : '';
      
      return (
        (filters.filterByType === '' || filters.filterByType === 'Type' || type.includes(filters.filterByType.toLowerCase())) &&
        (type.includes(searchTerm.toLowerCase()) ||
        addresse.includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase()))
      );
    });

    // Lógica de ordenamiento
    if (filters.sortBy === 'A-Z') {          
      filteredPayments.sort((a, b) => a.addresse.localeCompare(b.addresse));
    } else if (filters.sortBy === 'Z-A') {
      filteredPayments.sort((a, b) => b.addresse.localeCompare(a.addresse));

    } else if (filters.orderBy === 'Asc') {
        filteredPayments.sort((a, b) =>(
        filters.orderBy === 'Asc' ? a.amount - b.amount : b.amount - a.amount)
      );
    } 
    
    setSortedPayments(filteredPayments);
  }
}, [payments, searchTerm, filters]);

  // Eliminando entrada
  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`${editPaymentsUrl}/${paymentId}`);
      const updatedPayments = payments.filter(payment => payment.id !== paymentId);
      setPayments(updatedPayments);
      Swal.fire({
        icon:"success",
        title: "Payment successfully deleted!"
      })
    } catch (error) {
      console.error('Error deleting payment:', error.response.data.message);
    }
  };
  
  return (
    <Container>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} allPayments={payments} />

      {
        ( payments.length === 0) ?
        <NoPayment>
        <NpSubtitle>You haven't made any payments</NpSubtitle>
        <NpTitle>You can create one</NpTitle>
        <NavLink to="/payment">
          <h1>Here</h1>
        </NavLink>
        </NoPayment>
        :
        sortedPayments.length > 0 ? (
          sortedPayments.map((p, i) => (
            <Item key={p.id}>
              <Table>

                <TableTitle>                 
                  <Type>
                    <FaCircle />
                    <TypeTitle>{p.type}</TypeTitle>
                  </Type> 
                  <p>${p.amount}</p>
                </TableTitle>

                <div className={Styles.payment_description}>
                  <p>Addresse: {p.addresse}</p>  
                  <p>Date: {p.date}</p>
                  <p> Description: { p.description ? p.description : "No description available"}</p>        
                </div>

              </Table>
                
              <div className={Styles.payment_buttons}>
                <button 
                onClick={() => navigate(`/payment/${p.id}/edit`)}
                className={Styles.payment_button}>
                  <AiFillEdit />
                </button>

                <button 
                onClick={() => handleDeletePayment(p.id)}
                className={Styles.payment_button}>
                  <MdDelete />
                </button>
                </div>
              

            </Item>
          ))
        )
        : 
        null
      }    
    </Container>
  )
}


const Container = styled.div`
margin-top: 3rem;
width: 50%;
border-radius: 20px;
background-color: white;
box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
`
const NoPayment = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 1.5rem auto;
width: 60%;
color: rgba(0, 0, 0, 0.733)
`
const NpTitle = styled.h1`
font-size: 30px;
margin: 0.5rem;
`

const NpSubtitle = styled.h2`
color: gray;
margin: 0.5rem;
`
const Item = styled.div`
display: flex;
width: 90%;
margin: auto;
padding: 1rem 0;
border-bottom: 1px solid #DCD9FF;
`
const Table = styled.div`
display: flex;
flex-direction: column;
width: 85%;
margin: 0.5rem 0;
`

const TableTitle = styled.div`
display: flex;
align-items:center;
justify-content: center;
justify-content: space-between;
width: 90%;
font-weight: bold;
`

const Type = styled.div`
display: flex;
align-items: center;
width: 12rem;
padding-left: 2rem;
`

const TypeTitle = styled.p`
margin-left: 1rem
`
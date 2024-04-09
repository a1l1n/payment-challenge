import React , { useState } from 'react';
import styled from "styled-components";

export const Filters = ({ onFilterChange }) => {
  // States
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [filterByType, setFilterByType] = useState('');

  // Functions
  const handleSortByChange = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
    onFilterChange({ sortBy: sortByValue, orderBy, filterByType });
  };

  const handleOrderByChange = (e) => {
    const orderByValue = e.target.value;
    setOrderBy(orderByValue);
    onFilterChange({ sortBy, orderBy: orderByValue, filterByType });
  };

  const handleFilterByTypeChange = (e) => {
    const filterByTypeValue = e.target.value;
    setFilterByType(filterByTypeValue);
    onFilterChange({ sortBy, orderBy, filterByType: filterByTypeValue });
  };

  return (
    <Container>
      <Select 
      value={sortBy} onChange={handleSortByChange}>
        <option>Alphabetical</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </Select>

      <Select 
      value={orderBy} onChange={handleOrderByChange}>
        <option>Amount</option>
        <option value="Asc">Asc</option>
        <option value="Desc">Desc</option>
      </Select>

      <Select 
      value={filterByType} onChange={handleFilterByTypeChange}>
        <option >Type</option>
        <option value="CASH">Cash</option>
        <option value="DEBIT">Debit</option>
        <option value="CREDIT">Credit</option>
        <option value="BANK TRANSFER">Bank Transfer</option>
      </Select>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 22%;
height: 22rem;
margin-top: 3rem;
border-radius: 20px;
box-shadow: 0px 6px 10px -8px rgba(0, 0, 0, 0.568);
background-color: white;
`

const Select = styled.select`
width: 12rem;
height: 2.5rem;
margin: 1rem 0;
border: 1px solid #DCD9FF;
border-radius: 10px;
padding-left: 1rem
`

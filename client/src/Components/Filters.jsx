import React , { useState } from 'react';
import Styles from "./Filters.module.css";


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
    <div className={Styles.filters_container}>
      <select 
      className={Styles.filters_select}
      value={sortBy} onChange={handleSortByChange}>
        <option>Alphabetical</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>

      <select 
      className={Styles.filters_select}
      value={orderBy} onChange={handleOrderByChange}>
        <option>Amount</option>
        <option value="Asc">Asc</option>
        <option value="Desc">Desc</option>
      </select>

      <select 
      className={Styles.filters_select}
      value={filterByType} onChange={handleFilterByTypeChange}>
        <option >Type</option>
        <option value="CASH">Cash</option>
        <option value="DEBIT">Debit</option>
        <option value="CREDIT">Credit</option>
        <option value="BANK TRANSFER">Bank Transfer</option>
      </select>
    </div>
  )
}

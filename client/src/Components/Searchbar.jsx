import React from 'react';
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";

import axios from 'axios';
import styled from "styled-components";

export const Searchbar = ({ searchTerm, setSearchTerm, userId }) => {

  const handleDownload = async (userId) => {
    try {
      const response = await axios(`http://localhost:3000/user/${userId}/excel`, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pagos.xlsx');
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.log("FALLÓ TODO, AMIGOS!!", error)
    }
  };


  return (
    <Container>
      <Box>
        <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        />
        <Search>
          <IoSearch />
        </Search>
        
        <ButtonsContainer>
          <NavLink to="/payment">
            <Button>
              <IoMdCreate />
                Create
              </Button>
          </NavLink>
          <DownloadButton onClick={() => handleDownload(userId)}>Download</DownloadButton>
        </ButtonsContainer>
      </Box>
    </Container>
  )
};

const Container = styled.div`
width: 100%;
height: 6rem;
display: flex;
align-items: center;
border-bottom: 2px solid rgb(235, 235, 235);
`

const Box = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
margin: auto;
width: 100%;
height: 5rem;
`

const Input = styled.input`
height: 2.6rem;
width: 200px;
background-color: #DCD9FF;
border: none;
outline: none;
padding: 0 2rem;
border-radius: 20px;
`

const Search = styled.button`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background-color: #DCD9FF;
width: 2.5rem;
height: 2.5rem;
margin-right: 10rem;
color: #0c41b2;
border-radius: 50%;
font-size: 24px;
&:hover {
  border: transparent;
}
`
const ButtonsContainer = styled.div`
display: flex;
justify-content: space-between;
width: 14rem;
`

const Button = styled.button`
height: 2.5rem;
width: 6rem;
font-size: 16px;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-weight: 450;
background-color: #0c41b2;
box-shadow: 0px 6px 8px -8px rgba(0, 0, 0, 0.568);
&:hover {
  transition: 0.5s;
  background-color: #0c41b2cb;
}
`
const DownloadButton = styled.button`
height: 2.5rem;
width: 6rem;
font-size: 15px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
background-color: #0c41b2;
box-shadow: 0px 6px 8px -8px rgba(0, 0, 0, 0.568);
&:hover {
  transition: 0.5s;
  background-color: #0c41b2cb;
}
`
// 1285px, 900px
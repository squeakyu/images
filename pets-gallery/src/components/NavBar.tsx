import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
    </NavbarContainer>
  );
};

export default Navbar;

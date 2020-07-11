import React, { useContext } from 'react'
import AuthContext from '../../context/Auth/AuthContext'
import styled from '@emotion/styled'

const StyledNavbar = styled.nav`
  background: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fontFamily};
  font-size: 1.8rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  z-index: 1;
  width: 100%;
  opacity: 0.9;
  margin-bottom: 1rem;

  & > ul {
    display: flex;
  }
`;

const StyledLogout = styled.span`
  cursor: pointer;
  font-size: 1.3rem;
`;

const Navbar = (props) => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated, removeToken, redirectToRoot } = authContext;

    const logout = () => {
        removeToken();
        redirectToRoot();
    };

    return (
        <StyledNavbar>
            <h1>Thingiverse</h1>
            {isAuthenticated()  && <h2><StyledLogout onClick={logout}>Logout</StyledLogout></h2>}
        </StyledNavbar>
    )
}

export default Navbar

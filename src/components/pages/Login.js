import React, { useContext } from 'react'
import AuthContext from '../../context/Auth/AuthContext'
import styled from '@emotion/styled'

const StyledLoginButton = styled.div`
  background: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fontFamily};
  color: white;
  padding: 0.4rem 1.3rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  border-radius: 2rem;
  margin: 1rem 0;
  display: inline-block;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const StyledWrapper = styled.div`
    text-align: center;
    padding-top: 5%;
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fontFamily};
`;

const Login = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, redirectToThings } = authContext;

    return (
        <StyledWrapper>
            <h1>Welcome to Thingiverse</h1>
            {!isAuthenticated() ? (<div>
                    <a href={'https://www.thingiverse.com/login/oauth/authorize?client_id='+ process.env.REACT_APP_CLIENT_ID
                            + '&redirect_uri=' 
                            + process.env.REACT_APP_URL 
                            + ':' + process.env.REACT_APP_PORT 
                            + '/auth&response_type=code'} >
                                <StyledLoginButton>Login</StyledLoginButton>
                    </a>
                            
                </div>)
                : redirectToThings()
                }
        </StyledWrapper>
    )
}

export default Login

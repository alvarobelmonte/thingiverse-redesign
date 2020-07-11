import React from 'react'
import spinner from './spinner.gif'
import styled from '@emotion/styled'

const StyledSpinner = styled.img`
    width: 15rem;
    margin: auto;
    display: block;
    margin-top: 10%;
`;

const Spinner = () => {
    return (
        <StyledSpinner src={spinner} alt="Loading" /> 
    )
}

export default Spinner


import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const StyledTypeButton = styled.span`
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
    margin: 1rem;
    display: inline-block;

    &:hover {
        background-color: ${props => props.theme.colors.secondary};
    }
`;

const StyledWrapper = styled.div`
    text-align: center;
`;

const SelectType = () => {
    return (
            <StyledWrapper>
                <Link to={'/things/popular'}><StyledTypeButton>Popular</StyledTypeButton></Link>
                <Link to={'/things/featured'}><StyledTypeButton>Featured</StyledTypeButton></Link>
                <Link to={'/things/newest'}><StyledTypeButton>Newest</StyledTypeButton></Link>
            </StyledWrapper>
    )
}

export default SelectType

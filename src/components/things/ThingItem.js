import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'

const StyledCard = styled.div`
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fontFamily};
    background-color: white;
    padding: 2rem;
    border: #ccc 1px dotted;
    margin: 0.7rem 0;
    border-radius: 0.3rem;
    shadow-color: '#000';
    shadow-opacity: 0.8;
    shadow-radius: 5;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const StyledCardImage = styled.img`
    border-radius: 50%;
    border: 0.2rem solid ${props => props.theme.colors.secondary};
    transition: all 0.4s;
    width: 60%;

    &:hover {
        transform: scale(0.95);
    }
`;

const StyledCardButton = styled.button`
    background-color: black;
    font-family: ${props => props.theme.fontFamily};
    color: white;
    padding: 0.4rem 1.3rem;
    font-size: 0.8rem;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
    transition: opacity 0.2s ease-in;
    border-radius: 2rem;
    margin: 1rem;
    display: inline-block;

    &:hover {
        background-color: grey;
    }
`;

const StyledCreatorThumb = styled.img`
    border-radius: 5%;
    border: 0.1rem solid ${props => props.theme.colors.secondary};
    width: 10%;
`;

const ThingItem = ({ thing: {name, thumbnail, id, creator} }) => {
        return (
            <StyledCard>
               <StyledCardImage src={thumbnail} alt="thumbnail" /> 
               <h2>{name}</h2>
               <StyledCreatorThumb src={creator.thumbnail} alt="creator"/>
               <p>by <b>{creator.name}</b></p>
               <div>
                   <Link to={`/thing/${id}`}><StyledCardButton>More</StyledCardButton></Link>
               </div>
            </StyledCard>
        );
}

ThingItem.propTypes = {
    thing: PropTypes.object.isRequired
};

export default ThingItem;
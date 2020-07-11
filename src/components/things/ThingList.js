import React, { Fragment, useContext, useEffect } from 'react'
import ThingItem from './ThingItem'
import SelectType from '../layout/SelectType'
import Spinner from '../layout/Spinner'
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import AuthContext from '../../context/Auth/AuthContext'

import { useQuery } from '@apollo/react-hooks'
import  gql  from 'graphql-tag'

const StyledWrapperList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin: 3rem;
`;

const StyledTitle = styled.h1`
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fontFamily};
    text-align: center;
    margin: 5%;
`;

const ThingList = (props) => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated, redirectToRoot } = authContext;
    const { typeThing } = props;
    
    useEffect(() =>{
        if (!isAuthenticated()) {
            redirectToRoot();
        } 
    });

    const GET_THINGS_QUERY = gql`
    query getThings {
        ${typeThing} {
            id
            name
            thumbnail
            creator {
                name
                thumbnail
                public_url
            }
        }
    }
    `;
    const { loading, data, error } = useQuery(GET_THINGS_QUERY, {
        variables: { typeThing }
    });

    if (loading) {
       return <Spinner/>;
    }
    else if(error) {
        return <h2>Error loading things...</h2>;
    }
    else if(data) {
        return <Fragment>
                    <Navbar />
                    <StyledTitle>{ typeThing ? typeThing.toUpperCase() : '' }</StyledTitle>
                    <SelectType />
                    <StyledWrapperList>
                        {data && data[typeThing].map(thing => {
                            return <ThingItem key={thing.id} thing={thing} />;
                        })}
                    </StyledWrapperList>
                </Fragment>;
    }
}

ThingList.propTypes = {
    typeThing: PropTypes.string.isRequired,
};

export default ThingList;

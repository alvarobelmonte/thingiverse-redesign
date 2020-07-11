import React, { Fragment, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Navbar from '../layout/Navbar'
import {Link} from 'react-router-dom'
import styled from '@emotion/styled'
import AuthContext from '../../context/Auth/AuthContext'

import { useQuery } from '@apollo/react-hooks'
import  gql  from 'graphql-tag'

const StyledCard = styled.div`
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fontFamily};
    background-color: white;
    padding: 2rem;
    border: #ccc 1px dotted;
    border-radius: 0.3rem;
    shadow-color: '#000';
    shadow-opacity: 0.8;
    shadow-radius: 5;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 0 5%;
    padding: 5%;
`;

const StyledCardImage = styled.img`
    border-radius: 5%;
    border: 0.2rem solid ${props => props.theme.colors.secondary};
    width: 35%;  
    margin: 2%;
`;

const StyledCardButton = styled.span`
  background: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fontFamily};
  color: white;
  padding: 0.4rem 1.3rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in;
  outline: none;
  border-radius: 2rem;
  margin: 1rem;
  display: inline-block;
  margin-left: 5%;

  &:hover {
    background-color: grey;
  }
`;

const StyledCreatorImage = styled.img`
    border-radius: 50%;
    border: 0.2rem solid ${props => props.theme.colors.secondary};
    width: 3rem;  
`;

const StyledDetails = styled.div`
    text-align: left;
    padding-left: 10%;
    padding-right: 10%;

    & img {
        max-width: 12rem;
        border-radius: 5%;
    } 

    & ul {
        list-style-type: none;
    }
`;

const ThingProfile =({match}) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, redirectToRoot } = authContext;
    if (!isAuthenticated()) {
        redirectToRoot();
    } 
    const  { id } = match.params;

    const GET_THING_QUERY = gql`
    query getThing {
        thing(id: ${id}) {
            id
            name
            license
            view_count
            details
            download_count
            like_count
          
            default_image{
              url
              sizes {
                type
                size
                url
              }
            }
          
            creator {
                name
                public_url
                thumbnail
              }        
        }
    }
    `;

    const { loading, data, error } = useQuery(GET_THING_QUERY, {
        variables: { id }
    });

    if (loading) {
       return <Spinner/>;
    }

    else if (data) {
        const { name,
                details,
                license,
                view_count,
                download_count,
                like_count,
                default_image,
                creator} = data.thing;

        const imageUrl = default_image.sizes.find((img) => {
            return img.type === 'preview' && img.size === 'featured';
        })

        return (
            <Fragment>
                <Navbar />
                <Link to="/things/popular"><StyledCardButton>Back</StyledCardButton></Link>
                <StyledCard>

                    <h1>{name}</h1>
                    <StyledCardImage src={imageUrl.url} alt="thumb"/>
                    
                    <p>
                        <StyledCreatorImage src={creator.thumbnail} alt="thumb-creator"/>
                    </p>
                    <p>Created by <a href={creator.public_url}><b>{creator.name}</b></a></p>
                    <h3>{license}</h3>

                    <h3>Downloads</h3>
                    
                    <p><span role="img" aria-label="download">&#9196;</span> {download_count}</p>

                    <h3>Likes</h3>
                    <p><span role="img" aria-label="likes">&#128077;</span> {like_count}</p>

                    <h3>Views</h3>
                    <p><span role="img" aria-label="views">&#128064;</span> {view_count} </p>
                    
                    <StyledDetails dangerouslySetInnerHTML={{__html: details}}>
                    </StyledDetails>

                </StyledCard>
            </Fragment>
        );
    }
    else {
        console.log(error.message);
        return <p>Error loading thing</p>
    } 
}

export default ThingProfile

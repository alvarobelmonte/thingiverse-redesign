import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../context/Auth/AuthContext'
import Spinner from '../layout/Spinner'

const Auth = (props) => {
    const authContext = useContext(AuthContext);
    const { setToken } = authContext;

    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');

    useEffect(() => {
        if (!code) {
            window.location.href = 'https://www.thingiverse.com/login/oauth/authorize?client_id='+ process.env.REACT_APP_CLIENT_ID
            + '&redirect_uri=' 
            + process.env.REACT_APP_URL 
            + ':' + process.env.REACT_APP_PORT 
            + '/auth&response_type=code';
        }
        else {
            axios.post(process.env.REACT_APP_URL + ':' + process.env.REACT_APP_SERVER_PORT + '/oauth', {
                code: code
              })
              .then(function (response) {
                  const paramsToken = new URL('http://example.com?' + response.data).searchParams;
                  const token = paramsToken.get('token_type') + ' ' + paramsToken.get('access_token');
                  setToken(token);
                  props.history.push({pathname: '/things/popular', typeThing: 'popular'});
              })
              .catch(function (error) {
                console.log('Error getting access_token= ' + error);
              });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Spinner />
    )
}

export default Auth

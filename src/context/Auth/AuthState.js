import React from 'react';
import AuthContext from './AuthContext'


const AuthState = props => {
    const state = {
        popularRoute: process.env.REACT_APP_URL + ':' + process.env.REACT_APP_PORT + '/popular'
    }

    const setToken =  (token) => {
        localStorage.setItem('Authorization', token);
    }

    const removeToken =  () => {
        localStorage.removeItem('Authorization');
    }

    const isAuthenticated =  () => {
        if (localStorage.getItem('Authorization')) {
            return true;
        }
        else {
            return false;
        }
    }

    const redirectToRoot =  () => {
        window.location.href = process.env.REACT_APP_URL + ':' + process.env.REACT_APP_PORT;
    }

    const redirectToThings =  () => {
        window.location.href = process.env.REACT_APP_URL + ':' + process.env.REACT_APP_PORT + '/things/popular';
    }

    return <AuthContext.Provider
    value={{
        popularRoute: state.popularRoute,
        setToken,
        removeToken,
        isAuthenticated,
        redirectToRoot,
        redirectToThings
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthState;
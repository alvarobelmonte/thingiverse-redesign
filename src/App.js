import React from 'react';
import Auth from './components/routing/Auth'
import ThingList from './components/things/ThingList'
import ThingProfile from './components/things/ThingProfile'
import Login from './components/pages/Login'
import NotFound from './components/pages/NotFound'
import AuthState from './context/Auth/AuthState'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient  from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";

const setAuthorizationLink = setContext((request, {headers}) => {
  return {
    headers: {
        ...headers,
        authorization: localStorage.getItem('Authorization') || ''
    }
  }
});

function App() {

  const cache = new InMemoryCache();

  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const client = new ApolloClient({
    cache,
    link: setAuthorizationLink.concat(link)
  });

  const popular = 'popular';
  const featured = 'featured';
  const newest = 'newest';

  const theme = {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: '3rem',
    colors: {
      primary: '#5078F2',
      secondary: '#365fdb',
      grey: '#eaeaea'
    }
  }

  return (
    <AuthState>
      <ApolloProvider client={client}>
        <Router>
          <ThemeProvider theme={theme}>
            <Global styles={{
                            '*': {
                              boxSizing: 'border-box',
                              margin: 0,
                              padding: 0
                            },
                            'body': {
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                backgroundColor: theme.colors.grey,
                                color: '#333',
                                paddingBottom: '3rem'
                            }
                          }} />
              
              <Switch>
                
                <Route exact path='/' component={Login} />
                <Route exact path='/auth' component={Auth} />

                <Route   path="/things/popular"
                  render={(props) => <ThingList {...props} typeThing={popular} />}
                />
                <Route   path="/things/featured"
                  render={(props) => <ThingList {...props} typeThing={featured} />}
                />
                <Route   path="/things/newest"
                  render={(props) => <ThingList {...props} typeThing={newest} />}
                />

                <Route path="/thing/:id" component={ThingProfile} />
                <Route component={NotFound} />
              </Switch>
          </ThemeProvider>
        </Router>
      </ApolloProvider>
    </AuthState>
    
  );
}

export default App;

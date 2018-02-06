import React, { Component } from 'react';
import { render } from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Home from './Home'
import Pokemon from './Pokemon'
import './index.css'

const networkInterface = createNetworkInterface({
  uri: 'https://graphql-pokemon.now.sh',
});

const client = new ApolloClient({ networkInterface });

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <ApolloProvider client={client}>
        <div>
        <Route exact key='Home' path='/' component={Home} />
        <Route key='Pokemon' path='/pokemon/:pokemonId' component={Pokemon}/>
        </div>
      </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;

render(<App />, document.getElementById('root'));

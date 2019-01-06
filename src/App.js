import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { StripeProvider } from 'react-stripe-elements';
import { store, persistor } from './redux/store';
import { STRIPE_API_KEY } from './private';
import client from './graphql/instance';
import AppRouter from './router/AppRouter';
import './App.scss';

export class App extends Component {  
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StripeProvider apiKey={STRIPE_API_KEY}>
              <AppRouter />
            </StripeProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}


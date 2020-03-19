import React from 'react';
// import { ApolloProvider } from '@apollo/react-hooks';
// import Amplify, { Auth } from 'aws-amplify';
// import { withAuthenticator } from 'aws-amplify-react-native';

// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { ApolloClient } from 'apollo-client';

// import { persistCache } from 'apollo-cache-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Component
import { SafeAreaView } from 'react-native';

// Screen
// import Root from './src/app/animation';
// import Home from './src/app/apollo/Home';
import Root from './src/app/native-modules';

Ionicons.loadFont();

// Amplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: 'us-east-1',
//     userPoolId: 'us-east-1_nWPI52Q5G',
//     userPoolWebClientId: '78a4uqscbk7ptk02qo6ell4hki',
//   },
// });

// const httpLink = createHttpLink({
//   uri:
//     'https://bggapljp4rgfvd4x3s4jmx5uia.appsync-api.us-east-1.amazonaws.com/graphql',
// });

// const cache = new InMemoryCache();

// const authLink = setContext((_, { headers }) => {
//   // return the headers to the context so httpLink can read them
//   const token = Auth.user.signInUserSession.accessToken.jwtToken;
//   return {
//     headers: {
//       ...headers,
//       authorization: token,
//     },
//   };
// });

// // FIX ME - ASYNC FUNCTION
// persistCache({
//   cache,
//   storage: AsyncStorage,
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache,
// });

// const App = () => {
//   return (
//     <ApolloProvider client={client}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <Home />
//       </SafeAreaView>
//     </ApolloProvider>
//   );
// };

// export default withAuthenticator(App, true);

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root />
    </SafeAreaView>
  );
};
export default App;

console.disableYellowBox = true;

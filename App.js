import React from 'react';
// Component
import { SafeAreaView } from 'react-native';

// Screen
import Root from './src/app/native-modules';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root />
    </SafeAreaView>
  );
};
export default App;

console.disableYellowBox = true;

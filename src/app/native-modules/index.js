import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
// import { ToastExample } from '../../../custom-package/ToastExample';
import { UrineTestStripManager } from '../../../custom-package/TestStrip';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [result, setResult] = useState('');
  return (
    <View>
      {/* <Button
        title="Display Toast Android"
        onPress={() => ToastExample.show('Awesome', ToastExample.SHORT)}
      /> */}
      <Button
        title="Open Camera"
        onPress={() => {
          ImagePicker.launchCamera('', async response => {
            // Same code as in above section!
            console.log(response);
            const data = await UrineTestStripManager.findTestStrip(
              response.path,
            );
            console.log(data);
            setResult(JSON.stringify(data));
          });
        }}
      />
      <Text>{result}</Text>
    </View>
  );
};

export default App;

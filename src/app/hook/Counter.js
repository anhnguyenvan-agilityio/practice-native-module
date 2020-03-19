import React from 'react';
import { Button } from 'react-native';

const Counter = ({ value, children, onPress }) => {
  console.log('Render: ', children);
  return <Button title={children + ':' + value} onPress={onPress} />;
};

export default React.memo(Counter);

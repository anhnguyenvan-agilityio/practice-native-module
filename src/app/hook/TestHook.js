import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import Cars from './Cars';
import Counter from './Counter';

const TestHook = props => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [isDisplayListCars, displayListCars] = useState(true);
  const carsRef = useRef();

  // Component did mount
  useEffect(() => {
    console.log('Component did mount');
    // Get params from another screen
    console.log('PARAMS==>', props.route.params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Component will unmount
  useEffect(() => {
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // CHANGE STATE
  // Component did update with randomNumber
  useEffect(() => {
    // Call after render
    console.log('Call when change random number');
  }, [randomNumber]);

  const increaseCounter1 = React.useCallback(() => {
    setCount1(count1 + 1);
  }, [count1]);

  const increaseCounter2 = React.useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  const getRandomNumber = () => {
    const number = Math.round(Math.random() * 100);
    setRandomNumber(number);
  };

  return (
    <SafeAreaView>
      <View>
        <Counter value={count1} onPress={increaseCounter1}>
          Counter 1
        </Counter>
        <Counter value={count2} onPress={increaseCounter2}>
          Coutner 2
        </Counter>
        <Text>Get Random Number ==> {randomNumber}</Text>
        <Button title="Random number" onPress={getRandomNumber} />
        <Button
          title={isDisplayListCars ? 'Hide' : 'Visible'}
          onPress={() => displayListCars(!isDisplayListCars)}
        />
        {isDisplayListCars && <Cars ref={carsRef} />}
      </View>
      <Button
        title="Test Ref List Cars"
        onPress={() => {
          console.log('carsRef ==>', carsRef);
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => props.navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
};

export default TestHook;

import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const Cars = (props, ref) => {
  console.log('RE RENDER LIST CARS');
  const [cars, setCars] = useState([
    {
      name: 'CRV',
      status: 0,
    },
    {
      name: 'CX8',
      status: 0,
    },
    {
      name: 'Kona',
      status: 0,
    },
  ]);

  // Exposed to parent using ref
  useImperativeHandle(ref, () => ({
    cars,
  }));

  // Component did update with cars
  useEffect(() => {
    // Call after render
    console.log('Call when change cars');
  }, [cars]);

  // Component will unmount
  useEffect(() => {
    return () => {
      console.log('Component will unmount Cars component');
    };
  }, []);

  const handleChoiceCars = index => {
    const carsData = [...cars];
    carsData[index].status = !carsData[index].status;
    setCars(carsData);
  };

  return (
    <View>
      <Text>List Cars</Text>
      {cars.map((item, index) => {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleChoiceCars(index)}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: '#000',
                backgroundColor: item.status ? 'red' : 'white',
                marginTop: 10,
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default React.memo(React.forwardRef(Cars));

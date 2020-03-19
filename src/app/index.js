/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ThemeManager, { useTheme } from './ThemeManager';

function ProfileScreen(props) {
  const { theme, languageData } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primaryBackground,
      }}
    >
      <Text
        style={{
          color: theme.primaryText,
        }}
      >
        {props.title}
      </Text>
      <Button
        title={languageData.GO_TO_SETTINGS}
        onPress={() => props.navigation.navigate('Settings')}
      />
    </View>
  );
}
ProfileScreen.defaultProps = {
  title: 'ProfileScreen',
};

function NotificationsScreen({ navigation }) {
  const { theme, languageData } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primaryBackground,
      }}
    >
      <Text
        style={{
          color: theme.primaryText,
        }}
      >
        NotificationsScreen Screen
      </Text>
      <Button
        title={languageData.GO_TO_SETTINGS}
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const { theme, changeTheme, languageData, changeLanguage } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primaryBackground,
      }}
    >
      <Text
        style={{
          color: theme.primaryText,
        }}
      >
        SettingScreen Screen
      </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title={languageData.CHANGE_THEME_DEFAULT}
        onPress={() => changeTheme('default')}
      />
      <Button
        title={languageData.CHANGE_THEME_VALENTINE}
        onPress={() => changeTheme('valentine')}
      />
      <Button
        title={languageData.CHANGE_LANGUAGE + ' English'}
        onPress={() => changeLanguage('en')}
      />
      <Button
        title={languageData.CHANGE_LANGUAGE + ' VietNam'}
        onPress={() => changeLanguage('vn')}
      />
    </View>
  );
}

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const ref = React.useRef();
  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://demo.com', 'demo://'],
    config: {
      Settings: 'settings',
    },
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(error => {
        console.log('ERROR', error);
      })
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }
  return (
    <ThemeManager>
      <NavigationContainer initialState={initialState} ref={ref}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeManager>
  );
}

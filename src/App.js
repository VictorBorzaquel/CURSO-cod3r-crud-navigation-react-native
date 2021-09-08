import React from 'react';
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import { UsersProvider } from './context/UsersContext';

const Stack = createNativeStackNavigator();

const { Screen, Navigator } = Stack;

export default props => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Navigator initialRouteName="UserList" screenOptions={screenOptions}>
          <Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
              return {
                title: 'Lista de Usuários',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('UserForm')}
                    type="Clear"
                    icon={<Icon name="add" size={25} color="white" />}
                  />
                ),
              };
            }}
          />
          <Screen
            name="UserForm"
            component={UserForm}
            options={{ title: 'Formulario de Usuários' }}
          />
        </Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import UsersContext from '../context/UsersContext';

export default ({ route, navigation }) => {
  // console.warn(Object.keys(props.route.params));
  const userParams = route.params ? route.params : {};
  const [user, setUser] = useState(userParams);
  const { dispatch } = useContext(UsersContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setUser({ ...user, name })}
        placeholder="Nome Completo"
        value={user.name}
      />

      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setUser({ ...user, email })}
        placeholder="exemplo@email.com"
        value={user.email}
      />

      <Text style={styles.title}>URL do avatar</Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
        placeholder="https://pixabay.com/user.png"
        value={user.avatarUrl}
      />

      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'UPDATE_USER' : 'CREATE_USER',
            payload: user,
          });

          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 80,
  },
  title: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});

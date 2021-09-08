import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Avatar, Icon, Button } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {
  const { state, dispatch } = useContext(UsersContext);

  const confirmUserDelete = user => {
    Alert.alert(`Excluir Usuário: ${user.name}`, 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({ type: 'DELETE_USER', payload: user });
        },
      },
      { text: 'Não' },
    ]);
  };

  const renderUser = ({ item: user }) => (
    <ListItem
      bottomDivider
      onPress={() => props.navigation.navigate('UserForm')}>
      <Avatar source={{ uri: user.avatarUrl }} />
      <ListItem.Content>
        <ListItem.Title>{user.name}</ListItem.Title>
        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
      </ListItem.Content>
      <Button
        onPress={() => props.navigation.navigate('UserForm', user)}
        type="clear"
        icon={<Icon name="edit" size={25} color="orange" />}
      />
      <Button
        onPress={() => confirmUserDelete(user)}
        type="clear"
        icon={<Icon name="delete" size={25} color="red" />}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={renderUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
});

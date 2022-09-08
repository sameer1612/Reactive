import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RTRootStackParamList} from '../navigators/stack-nav';
import {useDeleteTodoMutation, useUpdateTodoMutation} from '../services/todosRtk';
import {styles} from '../styles/details';
import {RTHomeNavigationProp} from './RT-home';

export type RTDetailsScreenRouteProp = RouteProp<RTRootStackParamList, 'RTDetails'>;
export type RTDetailsNavigationProp = StackNavigationProp<RTRootStackParamList, 'RTDetails'>;

export function RTDetails() {
  const route = useRoute<RTDetailsScreenRouteProp>();
  const [todo, setTodo] = useState({...route.params.todo});
  const [editing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const navigation = useNavigation<RTHomeNavigationProp>();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  function handleUpdate() {
    updateTodo(updatedTodo);
    setEditing(false);
    setTodo(updatedTodo);
  }

  return (
    <View style={styles.wrapper}>
      {editing ? (
        <TextInput
          value={updatedTodo.title}
          style={styles.input}
          clearButtonMode={'always'}
          autoCapitalize={'sentences'}
          onChange={e =>
            setUpdatedTodo({
              ...updatedTodo,
              title: e.nativeEvent.text,
            })
          }
          onSubmitEditing={() => handleUpdate()}
        />
      ) : (
        <View style={styles.wrapper}>
          <Text style={styles.title}>{todo.title}</Text>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              setEditing(true);
            }}>
            <Text style={styles.editText}>{'Edit'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          deleteTodo(todo.id);
          navigation.goBack();
        }}>
        <Icon name="remove" color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
}

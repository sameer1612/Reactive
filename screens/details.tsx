import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../App';
import {TodosContext} from '../contexts/todos-context';
import {TodoActionTypes} from '../reducers/todos-reducer';
import {styles} from '../styles/details';
import {HomeNavigationProp} from './home';

export type DetailsNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export function Details() {
  const route = useRoute<DetailsScreenRouteProp>();
  const [todo, setTodo] = useState({...route.params.todo});
  const [editing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const {dispatch} = useContext(TodosContext);
  const navigation = useNavigation<HomeNavigationProp>();

  function handleCreate() {
    dispatch({
      type: TodoActionTypes.Update,
      payload: updatedTodo,
    });
    setEditing(false);
    setTodo(updatedTodo);
  }

  return (
    <View style={styles.wrapper}>
      {editing ? (
        <TextInput
          value={updatedTodo.title}
          style={styles.input}
          multiline
          clearButtonMode={'always'}
          autoCapitalize={'sentences'}
          onChange={e =>
            setUpdatedTodo({
              ...updatedTodo,
              title: e.nativeEvent.text,
            })
          }
          onSubmitEditing={() => handleCreate()}
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
          dispatch({
            type: TodoActionTypes.Delete,
            payload: todo,
          });
          navigation.goBack();
        }}>
        <Icon name="remove" color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
}

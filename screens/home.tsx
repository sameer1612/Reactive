import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../App';
import {Todo, TodosContext} from '../contexts/todos-context';
import {TodoActionTypes} from '../reducers/todos-reducer';
import {getTodos} from '../services/todos';
import {styles} from '../styles/home';
import {DetailsNavigationProp} from './details';

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<DetailsNavigationProp>();
  const {state, dispatch} = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    getTodos().then(todos => {
      dispatch({
        type: TodoActionTypes.Reset,
        payload: todos,
      });
    });
  }, [dispatch]);

  function sortTodos(todos: Todo[]) {
    return todos.sort(t => t.id).sort(t => (t.completed ? 1 : -1));
  }

  function handleCreate() {
    const todo: Todo = {
      id: Math.random(),
      userId: Math.random(),
      title: newTodoTitle,
      completed: false,
    };

    dispatch({
      type: TodoActionTypes.Create,
      payload: todo,
    });

    setNewTodoTitle('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTodoTitle}
        clearButtonMode={'always'}
        autoCapitalize={'sentences'}
        placeholder={'Add a new todo'}
        onChange={e => setNewTodoTitle(e.nativeEvent.text)}
        onSubmitEditing={() => handleCreate()}
      />

      <FlatList
        data={sortTodos(state.todos)}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {todo: item});
            }}>
            <View style={styles.todoCard}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <TouchableHighlight
                underlayColor={'salmon'}
                style={styles.doneBtn}
                onPress={() => {
                  dispatch({
                    type: TodoActionTypes.Complete,
                    payload: item,
                  });
                }}>
                {item.completed ? (
                  <Icon name="times" style={styles.completedToggleIcon} />
                ) : (
                  <Icon name="check" style={styles.completedToggleIcon} />
                )}
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

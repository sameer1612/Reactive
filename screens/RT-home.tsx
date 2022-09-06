import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {RTRootStackParamList} from '../navigators/stack-nav';
import {create, fetchTodos, update} from '../redux/features/todosSlice';
import {AppDispatch, RootState} from '../redux/store';
import {styles} from '../styles/home';
import {RTDetailsNavigationProp} from './RT-details';

export type RTHomeNavigationProp = StackNavigationProp<RTRootStackParamList, 'RTHome'>;
export type RTHomeScreenRouteProp = RouteProp<RTRootStackParamList, 'RTHome'>;

export function RTHome() {
  const navigation = useNavigation<RTDetailsNavigationProp>();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const {todos, loading} = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function handleCreate() {
    dispatch(
      create({
        id: todos.length + 1,
        userId: todos.length + 1,
        title: newTodoTitle,
        completed: false,
      }),
    );

    setNewTodoTitle('');
  }

  const sortedTodos = useMemo(() => {
    return [...todos].sort((t1, t2) => (t1.id > t2.id ? 1 : -1)).sort(t => (t.completed ? 1 : -1));
  }, [todos]);

  function TodosList() {
    return (
      <>
        {loading ? (
          <Text style={styles.wrapper}>{'Loading...'}</Text>
        ) : (
          <FlatList
            data={sortedTodos}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RTDetails', {todo: item});
                }}>
                <View style={styles.todoCard}>
                  <Text style={styles.todoTitle}>{item.title}</Text>
                  <TouchableHighlight
                    underlayColor={'salmon'}
                    style={styles.doneBtn}
                    onPress={() => {
                      dispatch(update({...item, completed: true}));
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
        )}
      </>
    );
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

      <TodosList />
    </View>
  );
}

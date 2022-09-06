import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../styles/details';
import {RTRootStackParamList} from '../navigators/stack-nav';
import {useDispatch} from 'react-redux';
import {RTHomeNavigationProp} from './RT-home';
import {StackNavigationProp} from '@react-navigation/stack';
import {destroy, update} from '../redux/features/todosSlice';

export type RTDetailsScreenRouteProp = RouteProp<RTRootStackParamList, 'RTDetails'>;
export type RTDetailsNavigationProp = StackNavigationProp<RTRootStackParamList, 'RTDetails'>;

export function RTDetails() {
  const route = useRoute<RTDetailsScreenRouteProp>();
  const [todo, setTodo] = useState({...route.params.todo});
  const [editing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const dispatch = useDispatch();
  const navigation = useNavigation<RTHomeNavigationProp>();

  function handleUpdate() {
    dispatch(update(updatedTodo));
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
          dispatch(destroy(todo));
          navigation.goBack();
        }}>
        <Icon name="remove" color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
}

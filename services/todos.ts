import axios from 'axios';
import {Todo} from '../contexts/todos-context';

export async function getTodos() {
  const res = await axios.get('http://localhost:3000/todos');
  return res.data as Todo[];
}

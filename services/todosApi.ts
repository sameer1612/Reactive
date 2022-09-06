import axios from 'axios';
import {Todo} from '../contexts/todos-context';

export async function getTodos() {
  await delay(1000);
  const res = await axios.get('http://localhost:3000/todos');
  return res.data as Todo[];
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve('done'), ms));
}

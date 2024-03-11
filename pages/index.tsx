import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { addTask, toggleTask } from '../features/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

export default function Home() {
  const [taskTitle, setTaskTitle] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialTasks = [
      { id: uuidv4(), title: "Sample Task 1", completed: false },
      { id: uuidv4(), title: "Sample Task 2", completed: true },
    ];
    initialTasks.forEach(task => {
      dispatch(addTask(task));
    });
  }, [dispatch]);

  const handleAddTask = () => {
    dispatch(addTask({ id: uuidv4(), title: taskTitle, completed: false }));
    setTaskTitle('');
  };

  return (
    <div className="container mx-auto p-4">
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={`mb-2 ${task.completed ? 'text-gray-400 line-through' : ''}`}>
            <Link href={`/tasks/${task.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
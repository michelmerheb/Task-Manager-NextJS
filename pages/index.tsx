import { useState, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { addTask, checkTask } from '../features/tasksSlice';
import { RootState } from '../features/redux';

export default function Home() {
  const [taskTitle, setTaskTitle] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `You have ${tasks.length} tasks`;
  }, [tasks]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    dispatch(addTask({ title: taskTitle, completed: false }));
    setTaskTitle('');
  };

  return (
    <div className='bg-gradient-to-r from-blue-300 via-purple-300 to-red-300 w-screen h-screen'>
    <div className='max-w-xl mx-auto py-8'>
      <h1 className='mb-7 text-center text-4xl'>Task Manager</h1>
      <form onSubmit={handleSubmit} className="flex items-center mb-6">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add a new task"
          className='flex-1 p-2 m-2 border text-black rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          aria-label="Task Title"
        />
        <button 
          type="submit" 
          className='px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
          Add Task
        </button>
      </form>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className='flex items-center gap-4 bg-white text-black p-4 rounded-lg shadow'>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(checkTask(task.id))}
              aria-label={'Mark ${task.title} as completed'}
              className='w-5 h-5'
            />
            <span className={`${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'} flex-1`}>
              {task.title}
            </span>
            <Link href={`/tasks/${task.id}`} className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

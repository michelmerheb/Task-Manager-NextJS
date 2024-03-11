import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTaskTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
  },
});

export const { addTask, toggleTask, removeTask, editTaskTitle } = tasksSlice.actions;

export default tasksSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  lastId: number;
}

const initialState: TasksState = {
  tasks: [],
  lastId: 0,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newId = ++state.lastId;
      const newTask = { ...action.payload, id: newId.toString() };
      state.tasks.push(newTask);
    },
    checkTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

  }
});

export const { addTask, checkTask} = tasksSlice.actions;

export default tasksSlice.reducer;

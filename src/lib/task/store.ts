import create from "zustand";
import { Task } from "../../types/Task";

interface TaskStore {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  updateTask: (index: number, newTask: Task) => void;
  removeTask: (index: number) => void;
}

const storedTasksString = localStorage.getItem("tasks");
const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : null;

const useTaskStore = create<TaskStore>((set) => ({
  tasks: storedTasks?.tasks || [],
  addTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
  updateTask: (index: number, newTask: Task) =>
    set((state) => {
      const updatedTasks = [...state.tasks];
      updatedTasks[index] = newTask;
      return { tasks: updatedTasks };
    }),
  removeTask: (index: number) =>
    set((state) => ({
      tasks: state.tasks.filter((_, i) => i !== index),
    })),
}));

useTaskStore.subscribe((state) => {
  const stateString = JSON.stringify(state);
  localStorage.setItem("tasks", stateString);
});

export default useTaskStore;

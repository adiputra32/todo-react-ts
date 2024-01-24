import create from "zustand";
import { Task } from "../../types/Task";

interface TaskStore {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  updateTask: (index: number, newTask: Task) => void;
  removeTask: (index: number) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
  updateTask: (index: number, newTask: Task) =>
    set((state) => {
      // console.log(newTask);

      const updatedTasks = [...state.tasks];
      updatedTasks[index] = newTask;
      return { tasks: updatedTasks };
    }),
  removeTask: (index: number) =>
    set((state) => ({
      tasks: state.tasks.filter((_, i) => i !== index),
    })),
}));

export default useTaskStore;

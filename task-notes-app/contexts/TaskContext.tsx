// contexts/TaskContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
 id: string;
 title: string;
 description: string;
 status: 'Not Started' | 'In Progress' | 'Done';
}

interface TaskContextType {
 tasks: Task[];
 addTask: (task: Omit<Task, 'id'>) => void;
 updateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
 deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [tasks, setTasks] = useState<Task[]>([]);

 const addTask = (taskData: Omit<Task, 'id'>) => {
   const newTask: Task = {
     ...taskData,
     id: uuidv4()
   };
   setTasks(prevTasks => [...prevTasks, newTask]);
 };

 const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
   setTasks(prevTasks => 
     prevTasks.map(task => 
       task.id === taskId ? { ...task, status: newStatus } : task
     )
   );
 };

 const deleteTask = (taskId: string) => {
   setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
 };

 return (
   <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
     {children}
   </TaskContext.Provider>
 );
};

export const useTaskContext = () => {
 const context = useContext(TaskContext);
 if (!context) {
   throw new Error('useTaskContext must be used within a TaskProvider');
 }
 return context;
};
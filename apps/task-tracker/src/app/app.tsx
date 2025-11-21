import { useState } from 'react';
import { Container } from 'rsuite';
import { Task, TaskStatus, TaskStats } from '../types/task.types';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskStats as TaskStatsComponent } from '../components/TaskStats';
import { generateId } from '@libs/utils';
import 'rsuite/dist/rsuite.min.css';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus>('all');

  // Add new task
  const handleAddTask = (title: string, description: string): void => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Toggle task completion
  const handleToggleTask = (id: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Calculate statistics - React Compiler will memoize this automatically
  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    active: tasks.length - tasks.filter((task) => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Container className="py-8 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Task Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks efficiently
          </p>
        </header>

        {/* Statistics */}
        <TaskStatsComponent stats={stats} />

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </Container>
    </div>
  );
}

export default App;

import { ButtonGroup, Button } from 'rsuite';
import { Task, TaskStatus } from '../types/task.types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskStatus;
  onFilterChange: (filter: TaskStatus) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onFilterChange,
  onToggleTask,
  onDeleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>

        <ButtonGroup>
          <Button
            appearance={filter === 'all' ? 'primary' : 'default'}
            onClick={() => onFilterChange('all')}
          >
            All
          </Button>
          <Button
            appearance={filter === 'active' ? 'primary' : 'default'}
            onClick={() => onFilterChange('active')}
          >
            Active
          </Button>
          <Button
            appearance={filter === 'completed' ? 'primary' : 'default'}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {filter === 'all' && 'No tasks yet. Add your first task above!'}
            {filter === 'active' && 'No active tasks. Great job!'}
            {filter === 'completed' && 'No completed tasks yet.'}
          </p>
        </div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import { Panel, Checkbox, Button } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import { Task } from '../types/task.types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Panel
      bordered
      className={`mb-3 transition-all duration-200 hover:shadow-lg ${
        task.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-2 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`text-sm mb-3 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
            <span>Created: {formatDate(task.createdAt)}</span>
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <span className="hidden sm:inline">•</span>
            )}
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <span>Updated: {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>

        <div className="pt-1">
          <Button
            appearance="subtle"
            color="red"
            onClick={() => onDelete(task.id)}
            className="transition-all duration-200 hover:bg-red-50"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </Panel>
  );
};

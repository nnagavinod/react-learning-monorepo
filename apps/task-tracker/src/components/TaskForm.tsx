import { useState } from 'react';
import { Form, Button, Input } from 'rsuite';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>
      <Form fluid>
        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Title *
          </Form.ControlLabel>
          <Input
            placeholder="Enter task title"
            value={title}
            onChange={(value) => setTitle(value)}
            onKeyPress={handleKeyPress}
            className="mb-4"
          />
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Description
          </Form.ControlLabel>
          <Input
            as="textarea"
            rows={3}
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(value) => setDescription(value)}
            className="mb-4"
          />
        </Form.Group>

        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full sm:w-auto"
        >
          Add Task
        </Button>
      </Form>
    </div>
  );
};

import { Panel, Timeline, Button, Tag, Message } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import { FormSubmission, FEEDBACK_CATEGORIES } from '../types/form.types';

interface FormHistoryProps {
  submissions: FormSubmission[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const FormHistory: React.FC<FormHistoryProps> = ({
  submissions,
  onDelete,
  onClearAll,
}) => {
  const getCategoryLabel = (value: string): string => {
    const category = FEEDBACK_CATEGORIES.find((cat) => cat.value === value);
    return category ? category.label : value;
  };

  const formatDate = (date: Date): string => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (submissions.length === 0) {
    return (
      <Panel bordered className="bg-white shadow-md">
        <Message showIcon type="info">
          No submissions yet. Complete and submit the form to see your history.
        </Message>
      </Panel>
    );
  }

  return (
    <Panel
      bordered
      header={
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-800">
            Submission History ({submissions.length})
          </span>
          <Button
            appearance="ghost"
            color="red"
            startIcon={<TrashIcon />}
            onClick={onClearAll}
            size="sm"
          >
            Clear All
          </Button>
        </div>
      }
      className="bg-white shadow-md"
    >
      <Timeline className="mt-4">
        {submissions.map((submission) => (
          <Timeline.Item key={submission.id}>
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(submission.timestamp)}
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {submission.data.personal.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {submission.data.personal.email}
                  </p>
                </div>
                <Button
                  appearance="subtle"
                  color="red"
                  size="xs"
                  onClick={() => onDelete(submission.id)}
                  startIcon={<TrashIcon />}
                >
                  Delete
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag color="blue" size="sm">
                    {getCategoryLabel(submission.data.feedback.category)}
                  </Tag>
                  <Tag color="yellow" size="sm">
                    {submission.data.feedback.rating} stars
                  </Tag>
                  <Tag color="green" size="sm">
                    {submission.data.feedback.satisfaction}% satisfied
                  </Tag>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {submission.data.feedback.message}
                </p>
                {submission.data.feedback.anonymous && (
                  <Tag color="orange" size="sm">
                    Anonymous
                  </Tag>
                )}
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Panel>
  );
};

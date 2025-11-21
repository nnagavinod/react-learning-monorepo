import { Panel, Button, Rate, Tag } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import { FeedbackFormData, FEEDBACK_CATEGORIES } from '../types/form.types';
import { FormStep } from '../types/form.types';

interface ReviewStepProps {
  data: FeedbackFormData;
  onEdit: (step: FormStep) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ data, onEdit }) => {
  const getCategoryLabel = (value: string): string => {
    const category = FEEDBACK_CATEGORIES.find((cat) => cat.value === value);
    return category ? category.label : value;
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <Panel
        bordered
        header={
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-800">
              Personal Information
            </span>
            <Button
              appearance="subtle"
              startIcon={<EditIcon />}
              onClick={() => onEdit('personal')}
              size="sm"
            >
              Edit
            </Button>
          </div>
        }
        className="bg-white shadow-md"
      >
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Name:</span>
            <span className="text-gray-900">{data.personal.name}</span>
          </div>
          <div className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Email:</span>
            <span className="text-gray-900">{data.personal.email}</span>
          </div>
          {data.personal.phone && (
            <div className="flex items-start">
              <span className="font-semibold text-gray-700 w-32">Phone:</span>
              <span className="text-gray-900">{data.personal.phone}</span>
            </div>
          )}
          {data.personal.age && (
            <div className="flex items-start">
              <span className="font-semibold text-gray-700 w-32">Age:</span>
              <span className="text-gray-900">{data.personal.age}</span>
            </div>
          )}
        </div>
      </Panel>

      {/* Feedback Section */}
      <Panel
        bordered
        header={
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-800">
              Feedback Details
            </span>
            <Button
              appearance="subtle"
              startIcon={<EditIcon />}
              onClick={() => onEdit('feedback')}
              size="sm"
            >
              Edit
            </Button>
          </div>
        }
        className="bg-white shadow-md"
      >
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Category:</span>
            <Tag color="blue">{getCategoryLabel(data.feedback.category)}</Tag>
          </div>
          <div className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Rating:</span>
            <Rate value={data.feedback.rating} readOnly size="sm" />
          </div>
          <div className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">
              Satisfaction:
            </span>
            <span className="text-gray-900">{data.feedback.satisfaction}%</span>
          </div>
          <div className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Message:</span>
            <p className="text-gray-900 flex-1 whitespace-pre-wrap">
              {data.feedback.message}
            </p>
          </div>
          {data.feedback.anonymous && (
            <div className="flex items-start">
              <span className="font-semibold text-gray-700 w-32">
                Anonymous:
              </span>
              <Tag color="orange">Yes</Tag>
            </div>
          )}
        </div>
      </Panel>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Please review your information carefully.</strong> Once
          submitted, you cannot edit this feedback.
        </p>
      </div>
    </div>
  );
};

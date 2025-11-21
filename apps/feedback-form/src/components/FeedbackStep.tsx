import { Form, SelectPicker, Rate, Input, Toggle, Slider, Panel } from 'rsuite';
import { FeedbackData, FEEDBACK_CATEGORIES } from '../types/form.types';

interface FeedbackStepProps {
  data: FeedbackData;
  onChange: (field: keyof FeedbackData, value: any) => void;
  onBlur: (field: keyof FeedbackData) => void;
  getFieldError: (field: keyof FeedbackData) => string | undefined;
  hasFieldError: (field: keyof FeedbackData) => boolean;
}

export const FeedbackStep: React.FC<FeedbackStepProps> = ({
  data,
  onChange,
  onBlur,
  getFieldError,
  hasFieldError,
}) => {
  return (
    <Panel
      bordered
      header={
        <span className="text-xl font-semibold text-gray-800">
          Share Your Feedback
        </span>
      }
      className="bg-white shadow-md"
    >
      <Form fluid>
        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Feedback Category *
          </Form.ControlLabel>
          <SelectPicker
            data={
              FEEDBACK_CATEGORIES as unknown as {
                label: string;
                value: string;
              }[]
            }
            value={data.category}
            onChange={(value) => onChange('category', value || '')}
            onClose={() => onBlur('category')}
            placeholder="Select a category"
            block
            searchable={false}
          />
          {hasFieldError('category') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('category')}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Rating *
          </Form.ControlLabel>
          <div className="flex items-center gap-4">
            <Rate
              value={data.rating}
              onChange={(value) => onChange('rating', value)}
              size="lg"
              color="yellow"
            />
            <span className="text-gray-600 font-medium">
              {data.rating > 0
                ? `${data.rating} star${data.rating !== 1 ? 's' : ''}`
                : 'No rating'}
            </span>
          </div>
          {hasFieldError('rating') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('rating')}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Message * ({data.message.length}/500)
          </Form.ControlLabel>
          <Input
            as="textarea"
            rows={5}
            value={data.message}
            onChange={(value) => onChange('message', value)}
            onBlur={() => onBlur('message')}
            placeholder="Tell us about your experience..."
            maxLength={500}
          />
          {hasFieldError('message') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('message')}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Overall Satisfaction: {data.satisfaction}%
          </Form.ControlLabel>
          <Slider
            value={data.satisfaction}
            onChange={(value) => onChange('satisfaction', value)}
            min={0}
            max={100}
            step={5}
            progress
            graduated
            className="mt-2"
          />
        </Form.Group>

        <Form.Group>
          <div className="flex items-center gap-3">
            <Toggle
              checked={data.anonymous}
              onChange={(checked) => onChange('anonymous', checked)}
              size="lg"
            />
            <span className="text-gray-700 font-semibold">
              Submit feedback anonymously
            </span>
          </div>
          <Form.HelpText className="text-gray-500 mt-2">
            When enabled, your personal information will not be included in the
            submission
          </Form.HelpText>
        </Form.Group>
      </Form>
    </Panel>
  );
};

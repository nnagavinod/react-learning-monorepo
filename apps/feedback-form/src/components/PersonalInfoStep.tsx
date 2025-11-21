import { Form, Input, InputNumber, Panel } from 'rsuite';
import { PersonalInfo } from '../types/form.types';
import { formatPhoneNumber } from '../utils/validation';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
  onBlur: (field: keyof PersonalInfo) => void;
  getFieldError: (field: keyof PersonalInfo) => string | undefined;
  hasFieldError: (field: keyof PersonalInfo) => boolean;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onChange,
  onBlur,
  getFieldError,
  hasFieldError,
}) => {
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    onChange('phone', formatted);
  };

  return (
    <Panel
      bordered
      header={
        <span className="text-xl font-semibold text-gray-800">
          Personal Information
        </span>
      }
      className="bg-white shadow-md"
    >
      <Form fluid>
        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Full Name *
          </Form.ControlLabel>
          <Form.Control
            name="name"
            value={data.name}
            onChange={(value) => onChange('name', value)}
            onBlur={() => onBlur('name')}
            errorMessage={getFieldError('name')}
            errorPlacement="bottomStart"
          />
          {hasFieldError('name') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('name')}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Email Address *
          </Form.ControlLabel>
          <Form.Control
            name="email"
            type="email"
            value={data.email}
            onChange={(value) => onChange('email', value)}
            onBlur={() => onBlur('email')}
            errorMessage={getFieldError('email')}
            errorPlacement="bottomStart"
          />
          {hasFieldError('email') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('email')}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Phone Number (Optional)
          </Form.ControlLabel>
          <Input
            value={data.phone}
            onChange={handlePhoneChange}
            onBlur={() => onBlur('phone')}
            placeholder="(555) 123-4567"
          />
          {hasFieldError('phone') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('phone')}
            </Form.HelpText>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="text-gray-700 font-semibold">
            Age (Optional)
          </Form.ControlLabel>
          <InputNumber
            value={data.age ? parseInt(data.age, 10) : null}
            onChange={(value) => onChange('age', value?.toString() || '')}
            onBlur={() => onBlur('age')}
            min={13}
            max={120}
            placeholder="Enter your age"
          />
          {hasFieldError('age') && (
            <Form.HelpText className="text-red-500">
              {getFieldError('age')}
            </Form.HelpText>
          )}
        </Form.Group>
      </Form>
    </Panel>
  );
};

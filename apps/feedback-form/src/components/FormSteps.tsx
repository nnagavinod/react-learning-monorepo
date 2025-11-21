import { Steps } from 'rsuite';
import { FormStep } from '../types/form.types';

interface FormStepsProps {
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
  completedSteps: Set<FormStep>;
}

export const FormSteps: React.FC<FormStepsProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  const getStepStatus = (step: FormStep): 'finish' | 'process' | 'wait' => {
    if (completedSteps.has(step)) return 'finish';
    if (currentStep === step) return 'process';
    return 'wait';
  };

  const getCurrentStepIndex = (): number => {
    const steps: FormStep[] = ['personal', 'feedback', 'review'];
    return steps.indexOf(currentStep);
  };

  return (
    <div className="mb-8">
      <Steps current={getCurrentStepIndex()} className="mb-4">
        <Steps.Item
          title="Personal Info"
          description="Basic information"
          status={getStepStatus('personal')}
          onClick={() => onStepClick('personal')}
          className="cursor-pointer"
        />
        <Steps.Item
          title="Feedback"
          description="Share your thoughts"
          status={getStepStatus('feedback')}
          onClick={() => onStepClick('feedback')}
          className="cursor-pointer"
        />
        <Steps.Item
          title="Review"
          description="Review and submit"
          status={getStepStatus('review')}
          className="cursor-pointer"
        />
      </Steps>
    </div>
  );
};

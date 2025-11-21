import { ButtonToolbar, Button } from 'rsuite';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import CheckIcon from '@rsuite/icons/Check';

interface FormNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
}) => {
  const handleNext = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <ButtonToolbar className="flex justify-between mt-6">
      <Button
        appearance="subtle"
        startIcon={<ArrowLeftLineIcon />}
        onClick={onPrevious}
        disabled={isFirstStep || isSubmitting}
      >
        Previous
      </Button>

      <Button
        appearance="primary"
        endIcon={isLastStep ? <CheckIcon /> : <ArrowRightLineIcon />}
        onClick={handleNext}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isLastStep ? 'Submit Feedback' : 'Next Step'}
      </Button>
    </ButtonToolbar>
  );
};

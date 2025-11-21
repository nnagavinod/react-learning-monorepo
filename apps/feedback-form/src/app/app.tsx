import { useEffect } from 'react';
import { Container, Panel, Progress, toaster, Message } from 'rsuite';
import {
  FormSteps,
  PersonalInfoStep,
  FeedbackStep,
  ReviewStep,
  FormNavigation,
  FormHistory,
} from '../components';
import {
  useLocalStorage,
  useDebounce,
  useFormValidation,
  useMultiStepForm,
} from '../hooks';
import {
  FeedbackFormData,
  FormSubmission,
  PersonalInfo,
  FeedbackData,
  FormStep,
} from '../types/form.types';
import { validatePersonalInfo, validateFeedback } from '../utils/validation';
import 'rsuite/dist/rsuite.min.css';

const INITIAL_FORM_DATA: FeedbackFormData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    age: '',
  },
  feedback: {
    category: '',
    rating: 0,
    message: '',
    anonymous: false,
    satisfaction: 50,
  },
};

export function App() {
  // Form data state with localStorage persistence
  const [formData, setFormData, clearFormData] =
    useLocalStorage<FeedbackFormData>('feedback-form-draft', INITIAL_FORM_DATA);

  // Submission history
  const [submissions, setSubmissions, clearSubmissions] = useLocalStorage<
    FormSubmission[]
  >('feedback-submissions', []);

  // Debounced form data for auto-save
  const debouncedFormData = useDebounce(formData, 500);

  // Auto-save effect
  useEffect(() => {
    // Auto-save is handled by useLocalStorage hook
    console.log('Form auto-saved');
  }, [debouncedFormData]);

  // Personal info validation
  const personalValidation =
    useFormValidation<PersonalInfo>(validatePersonalInfo);

  // Feedback validation
  const feedbackValidation = useFormValidation<FeedbackData>(validateFeedback);

  // Validate current step
  const validateStep = (step: FormStep): boolean => {
    if (step === 'personal') {
      personalValidation.setAllTouched(formData.personal);
      return personalValidation.validate(formData.personal);
    } else if (step === 'feedback') {
      feedbackValidation.setAllTouched(formData.feedback);
      return feedbackValidation.validate(formData.feedback);
    }
    return true;
  };

  // Multi-step form management
  const multiStep = useMultiStepForm(validateStep);

  // Validate on data change
  useEffect(() => {
    personalValidation.validate(formData.personal);
    feedbackValidation.validate(formData.feedback);
  }, [formData]);

  // Update personal info field
  const updatePersonalField = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Update feedback field
  const updateFeedbackField = (field: keyof FeedbackData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      feedback: {
        ...prev.feedback,
        [field]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateStep('feedback') || !validateStep('personal')) {
      toaster.push(
        <Message showIcon type="error">
          Please fix all validation errors before submitting.
        </Message>,
        { placement: 'topCenter', duration: 3000 }
      );
      return;
    }

    const submission: FormSubmission = {
      id: `submission-${Date.now()}`,
      data: formData,
      timestamp: new Date(),
    };

    setSubmissions((prev) => [submission, ...prev]);

    toaster.push(
      <Message showIcon type="success">
        Thank you! Your feedback has been submitted successfully.
      </Message>,
      { placement: 'topCenter', duration: 5000 }
    );

    // Reset form
    setFormData(INITIAL_FORM_DATA);
    clearFormData();
    multiStep.reset();
    personalValidation.resetValidation();
    feedbackValidation.resetValidation();
  };

  // Delete submission
  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
    toaster.push(
      <Message showIcon type="info">
        Submission deleted.
      </Message>,
      { placement: 'topCenter', duration: 2000 }
    );
  };

  // Clear all submissions
  const clearAllSubmissions = () => {
    clearSubmissions();
    toaster.push(
      <Message showIcon type="info">
        All submissions cleared.
      </Message>,
      { placement: 'topCenter', duration: 2000 }
    );
  };

  // Go to specific step for editing
  const handleEdit = (step: FormStep) => {
    multiStep.goToStep(step);
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl bg-linear-to-br from-gray-50 to-gray-100 py-8">
      <Container className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Feedback Form
          </h1>
          <p className="text-gray-600 text-lg">
            We value your opinion. Please share your feedback with us.
          </p>
        </header>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress.Line
            percent={multiStep.progress}
            strokeColor="#3498ff"
            showInfo={false}
            className="mb-2"
          />
          <p className="text-sm text-gray-600 text-center">
            Step {multiStep.currentStepIndex + 1} of {multiStep.totalSteps}
          </p>
        </div>

        {/* Form Steps Indicator */}
        <FormSteps
          currentStep={multiStep.currentStep}
          onStepClick={multiStep.goToStep}
          completedSteps={
            new Set(multiStep.isStepCompleted('personal') ? ['personal'] : [])
          }
        />

        {/* Form Content */}
        <Panel className="mb-6">
          {multiStep.currentStep === 'personal' && (
            <PersonalInfoStep
              data={formData.personal}
              onChange={updatePersonalField}
              onBlur={personalValidation.setFieldTouched}
              getFieldError={personalValidation.getFieldError}
              hasFieldError={personalValidation.hasFieldError}
            />
          )}

          {multiStep.currentStep === 'feedback' && (
            <FeedbackStep
              data={formData.feedback}
              onChange={updateFeedbackField}
              onBlur={feedbackValidation.setFieldTouched}
              getFieldError={feedbackValidation.getFieldError}
              hasFieldError={feedbackValidation.hasFieldError}
            />
          )}

          {multiStep.currentStep === 'review' && (
            <ReviewStep data={formData} onEdit={handleEdit} />
          )}

          {/* Navigation */}
          <FormNavigation
            isFirstStep={multiStep.isFirstStep}
            isLastStep={multiStep.isLastStep}
            onPrevious={multiStep.previousStep}
            onNext={multiStep.nextStep}
            onSubmit={handleSubmit}
          />
        </Panel>

        {/* Submission History */}
        <FormHistory
          submissions={submissions}
          onDelete={deleteSubmission}
          onClearAll={clearAllSubmissions}
        />
      </Container>
    </div>
  );
}

export default App;

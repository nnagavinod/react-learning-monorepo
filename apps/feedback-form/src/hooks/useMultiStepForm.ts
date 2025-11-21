import { useState, useCallback } from 'react';
import { FormStep } from '../types/form.types';

const STEPS: FormStep[] = ['personal', 'feedback', 'review'];

/**
 * Custom hook for managing multi-step form navigation
 * @param validateStep - function to validate current step before navigation
 * @returns step management state and methods
 */
export function useMultiStepForm(validateStep: (step: FormStep) => boolean) {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(
    new Set()
  );

  const currentStepIndex = STEPS.indexOf(currentStep);
  const totalSteps = STEPS.length;
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  // Go to next step if validation passes
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));

      if (currentStepIndex < STEPS.length - 1) {
        const nextStepValue = STEPS[currentStepIndex + 1];
        if (nextStepValue) {
          setCurrentStep(nextStepValue);
        }
        return true;
      }
    }
    return false;
  }, [currentStep, currentStepIndex, validateStep]);

  // Go to previous step
  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevStepValue = STEPS[currentStepIndex - 1];
      if (prevStepValue) {
        setCurrentStep(prevStepValue);
      }
    }
  }, [currentStepIndex]);

  // Go to specific step (for edit from review)
  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  // Check if step is completed
  const isStepCompleted = useCallback(
    (step: FormStep): boolean => {
      return completedSteps.has(step);
    },
    [completedSteps]
  );

  // Reset to first step
  const reset = useCallback(() => {
    setCurrentStep('personal');
    setCompletedSteps(new Set());
  }, []);

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    nextStep,
    previousStep,
    goToStep,
    isStepCompleted,
    reset,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === STEPS.length - 1,
  };
}

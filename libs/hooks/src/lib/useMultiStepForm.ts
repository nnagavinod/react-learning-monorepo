import { useState, useCallback } from 'react';

export interface UseMultiStepFormOptions {
  totalSteps: number;
  onStepChange?: (step: number) => void;
}

/**
 * Custom hook for managing multi-step form navigation
 * @param options - Configuration options
 * @returns multi-step form state and methods
 */
export function useMultiStepForm({
  totalSteps,
  onStepChange,
}: UseMultiStepFormOptions) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Go to next step
  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, totalSteps, onStepChange]);

  // Go to previous step
  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, onStepChange]);

  // Go to specific step
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        onStepChange?.(step);
      }
    },
    [totalSteps, onStepChange]
  );

  // Mark current step as completed and go to next
  const completeStep = useCallback(() => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    nextStep();
  }, [currentStep, nextStep]);

  // Mark specific step as completed
  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  }, []);

  // Check if step is completed
  const isStepCompleted = useCallback(
    (step: number): boolean => {
      return completedSteps.has(step);
    },
    [completedSteps]
  );

  // Reset to first step
  const reset = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    onStepChange?.(0);
  }, [onStepChange]);

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return {
    currentStep,
    completedSteps: Array.from(completedSteps),
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    progressPercentage,
    nextStep,
    previousStep,
    goToStep,
    completeStep,
    markStepComplete,
    isStepCompleted,
    reset,
  };
}

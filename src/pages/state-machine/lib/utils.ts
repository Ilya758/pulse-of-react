import { ModalState, PersonalData, PreferencesData, ReviewData } from '../model';

export const isPersonal = (state: ModalState): state is { type: 'personal'; data: PersonalData } =>
  state.type === 'personal';

export const isPreferences = (
  state: ModalState,
): state is { type: 'preferences'; data: PersonalData; preferences: PreferencesData } =>
  state.type === 'preferences';

export const isReview = (state: ModalState): state is { type: 'review'; data: ReviewData } =>
  state.type === 'review';

export const isSubmitting = (
  state: ModalState,
): state is { type: 'submitting'; data: ReviewData } => state.type === 'submitting';

export const isSuccess = (state: ModalState): state is { type: 'success'; data: ReviewData } =>
  state.type === 'success';

export const isError = (
  state: ModalState,
): state is { type: 'error'; data: ReviewData; error: string } => state.type === 'error';

export const submitForm = async (data: ReviewData): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (Math.random() < 0.3) {
    throw new Error(`Failed to submit form for ${data.personal.firstName}. Please try again.`);
  }
};

export const getCurrentStep = (state: ModalState): number => {
  if (isPersonal(state)) return 0;
  if (isPreferences(state)) return 1;
  if (isReview(state) || isSubmitting(state) || isError(state)) return 2;
  if (isSuccess(state)) return 3;

  return 0;
};

export const canProceed = (state: ModalState): boolean => {
  if (isPersonal(state)) {
    return (
      state.data.firstName.trim() !== '' &&
      state.data.lastName.trim() !== '' &&
      state.data.phoneNumber.trim() !== ''
    );
  }

  if (isPreferences(state)) {
    return state.preferences.theme !== '';
  }

  return false;
};


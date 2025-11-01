export type PersonalData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type PreferencesData = {
  theme: string;
  notifications: boolean;
  newsletter: boolean;
};

export type ReviewData = {
  personal: PersonalData;
  preferences: PreferencesData;
};

export type ModalState =
  | { type: 'idle' }
  | { type: 'personal'; data: PersonalData }
  | { type: 'preferences'; data: PersonalData; preferences: PreferencesData }
  | { type: 'review'; data: ReviewData }
  | { type: 'submitting'; data: ReviewData }
  | { type: 'success'; data: ReviewData }
  | { type: 'error'; data: ReviewData; error: string };

export type ModalAction =
  | { type: 'OPEN_PERSONAL' }
  | { type: 'UPDATE_PERSONAL'; payload: Partial<PersonalData> }
  | { type: 'NEXT_TO_PREFERENCES' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<PreferencesData> }
  | { type: 'NEXT_TO_REVIEW' }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: { error: string } }
  | { type: 'GO_BACK' }
  | { type: 'CLOSE' };

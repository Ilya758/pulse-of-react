import { MOCK_SERVER } from '../model';

export const mockApiService = {
  transferFunds: async (amount: number, csrfToken?: string) => {
    if (MOCK_SERVER.isCsrfProtectionEnabled && csrfToken !== MOCK_SERVER.csrfToken) {
      return { success: false, message: 'Invalid CSRF Token. Transfer failed.' };
    }

    MOCK_SERVER.balance -= amount;

    return { success: true, message: `Successfully transferred $${amount}.` };
  },
};


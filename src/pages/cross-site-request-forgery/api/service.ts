import { MOCK_SERVER } from '../model';

export const mockApiService = {
  transferFunds: async (amount: number, csrfToken?: string) => {
    if (MOCK_SERVER.isCsrfProtectionEnabled && csrfToken !== MOCK_SERVER.csrfToken) {
      return { message: 'Invalid CSRF Token. Transfer failed.', success: false };
    }

    MOCK_SERVER.balance -= amount;

    return { message: `Successfully transferred $${amount}.`, success: true };
  },
};

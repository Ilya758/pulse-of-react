export const fetchUser = (userId: number) => {
  return Promise.resolve({
    id: userId,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'A software developer specializing in React.',
  });
};

export const saveUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500);
  });
};


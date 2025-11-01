export const fetchUser = (userId: number) =>
  Promise.resolve({
    bio: 'A software developer specializing in React.',
    email: 'jane.doe@example.com',
    id: userId,
    name: 'Jane Doe',
  });

export const saveUser = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500);
  });

export const hashUserId = (userId: string): number => {
  const userHashMap: { [key: string]: number } = {
    alice: 15,
    bob: 35,
    charlie: 55,
    diana: 75,
    eve: 85,
    frank: 95,
    grace: 25,
    henry: 65,
  };

  return userHashMap[userId] || 50;
};

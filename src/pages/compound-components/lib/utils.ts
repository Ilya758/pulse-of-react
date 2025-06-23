export const toggleAccordionItem = (
  prevState: Record<string, true>,
  id: string,
  allowMultiple: boolean,
): Record<string, true> => {
  const isOpen = !!prevState[id];

  if (allowMultiple) {
    if (isOpen) {
      return Object.keys(prevState).reduce<Record<string, true>>((acc, key) => {
        if (key !== id) acc[key] = true;

        return acc;
      }, {});
    }

    return { ...prevState, [id]: true };
  }

  return isOpen ? {} : { [id]: true };
};


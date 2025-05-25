import React, { JSX, ReactElement } from 'react';

interface ConditionalProps {
  children: ReactElement | ReactElement[];
  condition?: boolean;
}

interface ChooseConditionalProps {
  children: Array<ReactElement<ConditionalProps>>;
}

export const If: React.FC<ConditionalProps> = ({ condition, children }) =>
  condition ? (children as JSX.Element) : null;

export const Otherwise: React.FC<ConditionalProps> = ({ children }) => children as JSX.Element;

export const Choose: React.FC<ChooseConditionalProps> = ({ children }) => {
  const selectedChild = children.find((child) => {
    const childToCompare = child.type.toString();

    switch (childToCompare) {
      case If.toString(): {
        return child.props.condition;
      }

      case Otherwise.toString(): {
        return true;
      }

      default: {
        return false;
      }
    }
  });

  return selectedChild || null;
};


import { ReactElement, FC, Children, isValidElement, cloneElement } from 'react';

type Props = {
  id: string;
  children: ReactElement | ReactElement[];
};

type WithIdProp = { id?: string };

export const AccordionItem: FC<Props> = ({ id, children }) => (
  <div data-accordion-item={id} style={{ marginBottom: '0.75rem' }}>
    {Children.map(children, (child) =>
      isValidElement(child) ? cloneElement(child as ReactElement<WithIdProp>, { id }) : child,
    )}
  </div>
);


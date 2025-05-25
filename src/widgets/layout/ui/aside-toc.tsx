import { TableOfContents, TableOfContentsProps } from '@mantine/core';

type Props = {
  pathname: string;
};

export const AsideTOC = ({ pathname }: Props) => {
  const getControlProps: TableOfContentsProps['getControlProps'] = ({ data }) => {
    return {
      onClick: () => {
        const element = data.getNode();

        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - 60;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      },
      children: data.value,
      style: { whiteSpace: 'normal' },
    };
  };

  return (
    <TableOfContents
      key={pathname}
      variant="filled"
      color="indigo"
      size="sm"
      radius="sm"
      scrollSpyOptions={{
        selector: 'h2',
      }}
      getControlProps={getControlProps}
    />
  );
};


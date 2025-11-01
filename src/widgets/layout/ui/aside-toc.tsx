import {
  Center,
  Loader,
  TableOfContents,
  TableOfContentsProps,
  useMantineTheme,
} from '@mantine/core';
import { Choose, If, Otherwise, useThemeColorContext } from '@/shared';
import { useTocContent } from '../model/hooks';

type Props = {
  pathname: string;
};

export const AsideTOC = ({ pathname }: Props) => {
  const { isContentLoaded } = useTocContent();
  const { primaryColor } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const color = colors[primaryColor]?.[6];

  const getControlProps: TableOfContentsProps['getControlProps'] = ({ data }) => ({
    children: data.value,
    onClick: () => {
      const element = data.getNode();

      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 60;

        window.scrollTo({
          behavior: 'smooth',
          top: offsetPosition,
        });
      }
    },
    style: { whiteSpace: 'normal' },
  });

  return (
    <Choose>
      <If condition={!isContentLoaded}>
        <Center style={{ height: '100%' }}>
          <Loader color={color} size="lg" type="bars" />
        </Center>
      </If>
      <Otherwise>
        <TableOfContents
          color={color}
          getControlProps={getControlProps}
          key={pathname}
          radius="sm"
          scrollSpyOptions={{
            selector: 'h2',
          }}
          size="sm"
          variant="filled"
        />
      </Otherwise>
    </Choose>
  );
};

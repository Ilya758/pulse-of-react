import {
  TableOfContents,
  TableOfContentsProps,
  Loader,
  Center,
  useMantineTheme,
} from '@mantine/core';
import { useTocContent } from '../model/hooks';
import { Choose, If, Otherwise } from '@/shared';
import { useThemeColorContext } from '@/shared';

type Props = {
  pathname: string;
};

export const AsideTOC = ({ pathname }: Props) => {
  const { isContentLoaded } = useTocContent();
  const { primaryColor } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const color = colors[primaryColor]?.[6];

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
    <Choose>
      <If condition={!isContentLoaded}>
        <Center style={{ height: '100%' }}>
          <Loader color={color} type="bars" size="lg" />
        </Center>
      </If>
      <Otherwise>
        <TableOfContents
          key={pathname}
          variant="filled"
          color={color}
          size="sm"
          radius="sm"
          scrollSpyOptions={{
            selector: 'h2',
          }}
          getControlProps={getControlProps}
        />
      </Otherwise>
    </Choose>
  );
};


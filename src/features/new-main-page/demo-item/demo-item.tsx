import * as React from 'react';

import { Box, Heading, Text } from '@effable/react';

import * as S from './demo-item.styled';

export interface DemoItemProps {
  /**
   * The content
   */
  title: string;
  description: string;
  preview?: string;
}

export const DemoItem = (props: DemoItemProps): JSX.Element => {
  const {
    title,
    description,
    preview,
  } = props;

  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    if (!preview) {
      setStatus('error');
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (newStatus: string) => () => {
      if (!isMounted) return;
      setStatus(newStatus);
    };

    setStatus('loading');
    image.onload = updateStatus('loaded');
    image.onerror = updateStatus('error');
    image.src = preview;

    // eslint-disable-next-line consistent-return
    return () => {
      isMounted = false;
    };
  }, [preview]);

  return (
    <Box
      display="flex"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
      >
        <Box
          marginTop={['11x']}
        >
          <Heading
            variant="h2"
          >
            {title}
          </Heading>
        </Box>

        <Box
          marginTop={['6x']}
        >
          <Text
            variant="m"
          >
            {description}
          </Text>
        </Box>
      </Box>

      <Box
        marginLeft={['11x']}
      >
        <S.Anchor>
          {status === 'loaded' && <S.DemoImg src={preview} alt={title} />}
        </S.Anchor>
      </Box>
    </Box>
  );
};

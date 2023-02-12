import * as React from 'react';

import {
  AspectRatio, Box, Heading, Text,
} from '@effable/react';

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
  const { title, description, preview } = props;

  const text = description.split('.').filter((sentence) => sentence);

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
      flexDirection={{
        base: 'column',
        laptop: 'row',
      }}
    >
      <Box
        display="flex"
        marginRight={{
          base: '0px',
          laptop: '11x',
        }}
        backgroundColor="neutral.neutral3"
        maxWidth="740px"
        maxHeight="416px"
        width={{
          base: '100%',
          laptop: '60%',
        }}
        height="100%"
      >
        <AspectRatio ratio={16 / 9}>
          <S.DemoImg src={preview} alt={title} />
        </AspectRatio>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        maxWidth={{
          base: '100%',
          laptop: '515px',
        }}
      >
        <Box
          display="flex"
          marginTop={{
            base: '6x',
            laptop: '11x',
          }}
        >
          <Heading variant="h2" color="text.primary">
            {title}
          </Heading>
        </Box>

        <Box display="flex" marginTop="6x" flexDirection="column">
          {text.map((sentence) => (
            <Text variant="m" color="text.primary" key={sentence}>
              {sentence}.
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

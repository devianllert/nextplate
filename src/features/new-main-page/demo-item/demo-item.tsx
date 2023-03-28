import { UrlObject } from 'url';

import * as React from 'react';

import Image from 'next/image';
import NextLink from 'next/link';

import {
  AspectRatio, Badge, Box, Heading, Text,
} from '@effable/react';

export interface DemoItemProps {
  title: string;
  description: string;
  preview: string;
  link?: string | UrlObject;
}

export const DemoItem = (props: DemoItemProps): JSX.Element => {
  const {
    title, description, preview, link,
  } = props;

  const text = description.split('.').filter((sentence) => sentence);

  return (
    <Box
      display="flex"
      width="100%"
      gridGap={{ base: '6x', laptop: '11x' }}
      flexDirection={{
        base: 'column',
        laptop: 'row',
      }}
    >
      <Box
        component={link ? NextLink : 'div'}
        href={link || undefined}
        display="flex"
        backgroundColor="neutral.neutral3"
        width={{
          base: '100%',
          laptop: '60%',
        }}
        height="100%"
      >
        <AspectRatio ratio={16 / 9}>
          <Image
            src={preview}
            alt={title}
            fill
            sizes={`
              (min-width: 1200px) 100vw,
              (min-width: 600px) 75vw,
              50vw
            `}
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        maxWidth={{
          base: '100%',
          laptop: '40%',
        }}
      >
        <Box
          display="flex"
          marginTop={{
            base: 'none',
            laptop: '11x',
          }}
        >
          <Heading component={link ? NextLink : 'div'} href={link || undefined} variant="h2" color="text.primary">
            {title}
          </Heading>

          {!link && (
            <Box ml="2x">
              <Badge color="neutral">Soon</Badge>
            </Box>
          )}
        </Box>

        <Box display="flex" marginTop="3x" flexDirection="column">
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

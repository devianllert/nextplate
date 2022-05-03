/* eslint-disable */
import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { DelayedLoading, DelayedLoadingProps } from '../delayed-loading';
import { wait } from '@/shared/lib/wait';
import { Fade } from '../../fade/fade';
import { LoadingOverlay } from '../../loading-overlay';
import { Box } from '../../box';
import { Heading } from '../../text';
import { useDelayedLoading } from '../use-delayed-loading';

export default {
  title: 'Design System/Components/DelayedLoading',
  component: DelayedLoading,
} as Meta;

const Template: Story<DelayedLoadingProps> = (args) => {
  const [state, setState] = React.useState(0);
  const [status, setStatus] = React.useState<string>('idle');

  const handleLoad = async () => {
    if (status === 'loading') return;

    setStatus('loading');
    await wait(500);

    setState((prevState) => prevState + 1);
    setStatus('success');
  };

  return (
    <>
      <button type="button" onClick={handleLoad}>load next number</button>
      <DelayedLoading {...args} loading={status === 'loading'}>
        {({ loading }) => (
          <>
            {loading && <div>loading...</div>}
            {!loading && state}
          </>
        )}
      </DelayedLoading>
    </>
  );
};

export const Basic = Template.bind({});

export const WithAnimations = () => {
  const [state, setState] = React.useState(0);
  const [status, setStatus] = React.useState<string>('idle');

  const handleLoad = async () => {
    if (status === 'loading') return;

    setStatus('loading');
    await wait(500);

    setState((prevState) => prevState + 1);
    setStatus('success');
  };

  return (
    <DelayedLoading loading={status === 'loading'}>
      {({ loading }) => {
        return (
          <>
            <button type="button" onClick={handleLoad} disabled={status === 'loading' || loading}>load next number</button>
            <Box position="relative">
              <Fade in={loading} unmountOnExit>
                <LoadingOverlay loader="loading..." />
              </Fade>

              <Box
                width={400}
                height={300}
                background="cyan"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Heading variant="h2">{state}</Heading>
              </Box>
            </Box>
          </>
        );
      }}
    </DelayedLoading>
  );
};

export const UsingHook = () => {
  const [state, setState] = React.useState(0);
  const [status, setStatus] = React.useState<string>('idle');
  const delayedLoading = useDelayedLoading({
    loading: status === 'loading',
  });

  const handleLoad = async () => {
    if (status === 'loading') return;

    setStatus('loading');
    await wait(500);

    setState((prevState) => prevState + 1);
    setStatus('success');
  };

  return (
    <>
      <button type="button" onClick={handleLoad} disabled={status === 'loading' || delayedLoading}>load next number</button>
      <Box position="relative">
        <Fade in={delayedLoading} unmountOnExit>
          <LoadingOverlay loader="loading..." />
        </Fade>

        <Box
          width={400}
          height={300}
          background="cyan"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading variant="h2">{state}</Heading>
        </Box>
      </Box>
    </>
  );
};

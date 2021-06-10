import styled from '@emotion/styled';
import { AnimatedTextBubble } from './AnimatedTextBubble';

const LoaderWrapper = styled.div`
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoaderProps {}

const Loader = (props: LoaderProps): JSX.Element => {
  return (
    <LoaderWrapper>
      <AnimatedTextBubble />
    </LoaderWrapper>
  );
};

export default Loader;

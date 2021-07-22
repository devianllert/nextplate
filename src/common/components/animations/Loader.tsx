import styled from '@emotion/styled';
import { AnimatedTextBubble } from './AnimatedTextBubble';

const LoaderWrapper = styled.div`
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const Loader = (): JSX.Element => {
  return (
    <LoaderWrapper>
      <AnimatedTextBubble />
    </LoaderWrapper>
  );
};

export default Loader;

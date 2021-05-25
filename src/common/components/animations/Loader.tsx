import styled from 'styled-components';
import { AnimatedTextBubble } from './AnimatedTextBubble';

const LoaderWrapper = styled.div`
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export interface LoaderProps {}

const Loader = (props: LoaderProps): JSX.Element => {
  return (
    <LoaderWrapper>
      <AnimatedTextBubble />
    </LoaderWrapper>
  );
};

export default Loader;

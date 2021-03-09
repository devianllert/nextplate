import styled from 'styled-components';
import AnimatedTextBubble from './AnimatedTextBubble';

const LoaderWrapper = styled.div`
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = {};

const Loader = (props: Props): JSX.Element => {
  return (
    <LoaderWrapper>
      <AnimatedTextBubble />
    </LoaderWrapper>
  );
};

export default Loader;

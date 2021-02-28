import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
`;

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>123</Container>
    </>
  );
}

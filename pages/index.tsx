import React from 'react';
import { Layout } from 'components/sections/layout';
import { styled } from 'theme';
import { Panel, Button } from 'components/ui';
import { useAavegotchi } from 'context/AavegotchiContext';
import router from 'next/router';

const Grid = styled.section`
  display: grid;
  gap: 3.2rem;

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQueries.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.light2};
  padding: 2.4rem;
  color: ${({ theme }) => theme.colors.dark0};

  :hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primaryAccent};
  }

  p {
    margin: 0;
  }
`

const PlayButtonContainer = styled.div`
  padding-top: 2.4rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Home = () => {
  const { state: { selectedAavegotchiId }} = useAavegotchi();

  return (
    <Layout>
      <Panel>
        <h1>South Beach ROFL Ball!!</h1>
        <p>GM frens! Its beach day! Grab some sunscreen and your favorite gotchi and head down to South Beach for some fun in the sun! Rofl Ball is going viral in the gotchivese and your frens are super excited to play, but not all gotchis are as athletic as others. <strike>Frens with high energy will move faster</strike> and those with more aggression will be able to bounce the ball higher. Watch out for pesky crabs on the beach, if your rofl ball gets too close they will pop it! if the gotchi you select is particularly spooky it should scare away some of the more fearful crabs. Your gotchis are not a fan of crabs so every time they get too close your fren will become more irritated. The larger your gotchis brain, the less tolerant they will be of those crabs nipping at their ghostly nethers. Since rofls are so expensive these days, you could only afford 3 rofl balls and when they are gone the game is over. The game will also end if your gotchis irritation tolerance reaches zero and you’ll have pack up and head to the pharmacy for ghost shampoo!</p>
        <h2>Controls:</h2>
        <p>move left = A or left arrow,   move right = D or right arrow,   jump = space or W or up arrow</p>
        {/* <Grid>
          <Card href="https://nextjs.org/docs/basic-features/pages" target="_blank">
            <h3>Next.js Documentation</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </Card>
          <Card href="https://docs.moralis.io/" target="_blank">
            <h3>Moralis Documentation</h3>
            <p>Learn about Moralis' suite of features for easy web3 integration.</p>
          </Card>
          <Card href="https://docs.aavegotchi.com/diamond-facets/aavegotchifacet.sol" target="_blank">
            <h3>Aavegotchi Diamond</h3>
            <p>Search the Aavegotchi dev wiki for the various contract methods.</p>
          </Card>
          <Card href="https://styled-components.com/" target="_blank">
            <h3>Styled components</h3>
            <p>Learn about the CSS-in-JS tool that bridges the gap between components and styling.</p>
          </Card>
        </Grid> */}
      </Panel>
      <PlayButtonContainer>
        <Button
          disabled={!selectedAavegotchiId}
          primary
          onClick={() => router.push('/play')}
        >
          PLAY
        </Button>
      </PlayButtonContainer>
    </Layout>
  )
}

export default Home;
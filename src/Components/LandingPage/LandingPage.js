import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'react-emotion';
import flower from './flower.svg';

const TopSection = styled('div')`
  width: 100%;
  height: 100vh;
  background: #dbe7f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomSection = styled('div')`
  min-height: 100vh;
  background: #fffff;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  @media (max-width: 770px) {
    flex-direction: column;
  }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 30% }
`;

const mobileTyping = keyframes`
  from { width: 0 }
  to { width: 90% }
  }
`;

const blinkingCursor = keyframes`
  from, to { border-color: transparent }
  50% { border-color: black }
`;

const WelcomeTextContainer = styled('div')`
  font-family: monospace;
  letter-spacing: 0.15em;
  margin: 0 auto !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  border-right: 0.15em solid black;
  animation: ${typing} 2.5s steps(22, end), ${blinkingCursor} 1s step-end infinite;
  @media (max-width: 770px) {
    animation: ${mobileTyping} 3s steps(40, end), ${blinkingCursor} 1s step-end infinite;
  }
`;

const WelcomeText = styled('p')`
  font-size: 2em;
  font-weight: bold;
  @media (max-width: 770px) {
    font-size: 1.5em;
  }
`;

const FlowerContainer = styled('div')`
  height: 155px;
  width: 155px;
  overflow-y: hidden;
  margin-bottom: 1em;
  @media (max-width: 770px) {
    margin-bottom: 0.3em;
  }
`;

const Flower = styled('img')`
  position: relative;
  height: auto;
  width: 155px;
`;

const PhoneImage = styled('img')`
  width: 287px;
  height: 587px;
  @media (max-width: 770px) {
    width: 143.5px;
    height: 293.5px;
  }
`;

const DesktopImage = styled('img')`
  height: 589.6px;
  width: 688.4px;
  @media (max-width: 770px) {
    width: 294.18px;
    height: 344.2px;
  }
`;

const LandingPage = props => {
  return (
    <div>
      <TopSection>
        <FlowerContainer>
          <Flower size="small" src={flower} alt="growing flower" />
        </FlowerContainer>
        <WelcomeTextContainer>
          <WelcomeText>Welcome to Habit Garden</WelcomeText>
        </WelcomeTextContainer>
      </TopSection>
      <BottomSection>
        <DesktopImage src="https://s3.amazonaws.com/habit-garden-images/habit_garden_desktop.png" />
        <PhoneImage src="https://s3.amazonaws.com/habit-garden-images/habit_garden_mobile_view.png" />
      </BottomSection>
    </div>
  );
};

export default LandingPage;

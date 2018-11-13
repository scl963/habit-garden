import { GenericContainer } from '../Styles';
import React from 'react';
import styled from 'react-emotion';

const GardenContainer = styled('div')`
  margin: 0 auto;
  width: 80%;
  margin-top: 4em;
  @media (max-width: 770px) {
    width: 100%;
  }
`;

const Garden = props => {
  return <GardenContainer>Under Construction</GardenContainer>;
};

export default Garden;

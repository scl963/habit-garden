import styled from 'react-emotion';
import React from 'react';

const Container = styled('div')`
  width: 700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  @media (max-width: 760px) {
    margin: 0px;
    width: 95vw;
  }
`;

export const GenericContainer = props => <Container>{props.children}</Container>;
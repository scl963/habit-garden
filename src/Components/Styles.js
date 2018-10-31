import styled from 'react-emotion';
import React from 'react';

const Container = styled('div')`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  @media (max-width: 760px) {
    margin: 0px;
    width: 95vw;
  }
`;

export const DarkBackground = styled('div')`
  background-color: #595353;
`;

export const GenericContainer = props => <Container>{props.children}</Container>;

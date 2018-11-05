import styled from 'react-emotion';
import React from 'react';

const Container = styled('div')`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  margin-top: 2em;
  @media (max-width: 770px) {
    margin: 0px;
    margin-top: 2em;
    width: 95vw;
  }
`;

export const DarkBackground = styled('div')`
  background-color: #595353;
`;

export const GenericContainer = props => <Container>{props.children}</Container>;

export const LoginFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 400px;
  margin: 0 auto;
  @media (max-width: 770px) {
    width: 100%;
  }
`;

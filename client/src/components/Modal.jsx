import React from 'react'
import styled from 'styled-components'

import { Card } from './Card/Card'

export const Modal = ({ inputs, multipleInputs, children }) => {
  return(
    <ModalContainer>
      <Card defaultColor inputs={inputs} modal multipleInputs={multipleInputs}>
        {children}
      </Card>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  background-color: ${p => p.theme.styles.colors.black}BB;
  position: absolute;
  top: 0;
  left: 248px;
  z-index: 998;
  width: calc(100% - 312px);
  height: calc(100vh - 24px);
  padding: ${p => p.theme.styles.padding.medium};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    top: 64px;
    left: 0;
    width: calc(100% - 64px);
    height: calc(100vh - 88px);
  }

`
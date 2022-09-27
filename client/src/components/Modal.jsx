import React from 'react'
import styled from 'styled-components'
import { motion} from 'framer-motion'
import { Card } from './Card/Card'

const animationMain = {
  offscreen: {
    y: -1300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.6,
    },
  },
}

export const Modal = ({ inputs, multipleInputs, children }) => {
  return(
    <ModalContainer as={motion.div} initial="offscreen" whileInView="onscreen" >
      <ModalContent as={motion.div} variants={animationMain} >
        <Card defaultColor inputs={inputs} modal multipleInputs={multipleInputs}>
          {children}
        </Card>
      </ModalContent>
    </ModalContainer>
  )
}

const ModalContainer = styled(motion.div)`
  background-color: ${p => p.theme.styles.colors.black}BB;
  position: fixed;
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

const ModalContent = styled(motion.div)`
  position: fixed;
  width: calc(100% - 312px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    width: calc(100% - 64px);
  }
`


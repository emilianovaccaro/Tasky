import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
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
      duration: 1,
    },
  },
}

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 }
}

export const Modal = ({ inputs, multipleInputs, children }) => {
  return(
    <ModalContainer  variants={button} whileHover="hover" whileTap="pressed" as={motion.div}initial="offscreen" whileInView="onscreen" >
      <motion.div as={motion.div} variants={animationMain}>
        <Card as={motion.div} variants={animationMain} defaultColor inputs={inputs} modal multipleInputs={multipleInputs}>
          {children}
        </Card>
      </motion.div>
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
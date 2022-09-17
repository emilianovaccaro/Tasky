import React from 'react'
import styled from 'styled-components'
import { Icon, icons } from '../Icon'
import { Label } from '../Text/Label'
import { SubLabel } from '../Text/SubLabel'

export const Input = ( {inputLabel, type, name, onChange, value, radioSubLabel, id, error, maxLength} ) => {

  const [eye, setEye] = React.useState(true)

  function changeVisibility(e) {
    console.log(e)
    // TODO: terminar la funcionalidad de cambio de password a text
    setEye(eye => !eye)
  }

  return(
    <>
      <Label marginBottom={'16px'} htmlFor={id}>{inputLabel}</Label>
      {error && <Label error>{error}</Label>}
      <InputContainer>
        <InputField
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          error={error}
          maxLength={maxLength}
        />
        {type === 'radio' && <SubLabel htmlFor={id}>{radioSubLabel}</SubLabel>}
        {type === 'password' && <Icon as={eye ? icons.eye : icons.eyeCross} white={'white'} onClick={e => changeVisibility(e)}/>}
      </InputContainer>
    </>
  )
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 90%;
  }
`

const InputField = styled.input`
  outline: 0;
  font-weight: ${p => p.theme.styles.fontWeight.regular};
  color: ${p => p.theme.styles.colors.white};
  border-radius: ${p => p.theme.styles.borderRadius.small};
  background-color: ${p => p.theme.styles.colors.white}19;
  border: 2px solid;
  border-color: ${p => p.theme.styles.colors.white}80;
  border-color: ${p => p.error && p.theme.styles.colors.red};
  padding: ${p => p.theme.styles.padding.small};
  transition: .2s;
  display: block;
  width: 100%;
  box-sizing: border-box;

  &[type='password'] {
    padding-right: 40px;
  }

  &[type='radio'] {
    cursor: pointer;
    width: ${({theme}) => theme.styles.fontSize.extraSmall};
    height: ${({theme}) => theme.styles.fontSize.extraSmall};
    border-radius: ${p => p.theme.styles.borderRadius.large};
  }

  :focus {
    border-color: ${p => p.error ? p.theme.styles.colors.red : p.theme.styles.colors.white};
  }
`
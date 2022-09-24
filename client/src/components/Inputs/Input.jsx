import React from 'react'
import styled from 'styled-components'
import { Icon, icons } from '../Icon'
import { Label } from '../Text/Label'
import { SubLabel } from '../Text/SubLabel'

export const Input = ({ inputLabel, accept, fullWidth, type, name, onChange, value, className, radioSubLabel, id, error, maxLength, touched, onBlur, defaultChecked }) => {
  const [eye, setEye] = React.useState(true)
  const [newType, setNewType] = React.useState('')

  const changeVisibility = () => {
    if (eye) {
      setNewType('text')
    } else {
      setNewType('password')
    }

    return setEye(eye => !eye)
  }

  return(
    <InputBoxContainer fullWidth={fullWidth}>
      <Label marginBottom={'16px'} htmlFor={id}>{inputLabel}</Label>
      <InputContainer className={className}>
        <InputField
          id={id}
          name={name}
          type={newType || type}
          onChange={onChange}
          value={value}
          error={touched && error}
          maxLength={maxLength}
          onBlur={onBlur}

          defaultChecked={defaultChecked}
          accept={accept}
        />
        {type === 'radio' && <SubLabel className='radio-label' htmlFor={id}>{radioSubLabel}</SubLabel>}
        {type === 'password' && <Icon notext='true' as={eye ? icons.eye : icons.eyeCross} white={'white'} onClick={() => changeVisibility()}/>}
      </InputContainer>
      {touched && error &&  <SubLabel error>{error}</SubLabel>}
    </InputBoxContainer>
  )
}

const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media screen and (min-width: ${p => p.theme.styles.breakpoints.medium}) {
    max-width: calc(50% - 10px);
    max-width: ${p => p.fullWidth && '100%'};
  }

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    min-width: ${p => p.fullWidth && '100%'};
  }
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 88%;
  }
  
  .radio-label {
    cursor: pointer;
  }
`

const InputField = styled.input`
  outline: 0;
  font-size: ${p => p.theme.styles.fontSize.small};
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
    padding-right: 64px;
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
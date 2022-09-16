import React from 'react'
import styled from 'styled-components'
import { Icon, icons } from '../Icon'
import { Label } from '../Text/Label'

export const Input = ( {inputLabel, type, name, onChange, value, id, error, maxLength} ) => {
  return(
    <>
      <Label>{inputLabel}</Label>
      {error && <Label error>{error}</Label>}
      <InputField
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        error={error}
        maxLength={maxLength}
      />
      {type === 'password' && <Icon as={icons.eye} white />}
    </>
  )
}

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
  margin-top: 16px;

  :focus {
    border-color: ${p => p.error ? p.theme.styles.colors.red : p.theme.styles.colors.white};
  }
`
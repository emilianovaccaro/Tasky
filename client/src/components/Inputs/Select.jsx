import React from 'react'
import styled from 'styled-components'
import { Label } from '../Text/Label'

export const Select = ( {inputLabel, name, onChange, id, error, children} ) => {
  return(
    <>
      <Label marginBottom={'16px'} htmlFor={id}>{inputLabel}</Label>
      {error && <Label error>{error}</Label>}
      <InputSelect
        id={id}
        name={name}
        onChange={onChange}
        error={error}
      >
        {children}
      </InputSelect>
    </>
  )
}

const InputSelect = styled.select`
  outline: 0;
  width: 100%;
  display: block;
  cursor: pointer;
  padding: ${p => p.theme.styles.padding.small};
  color: ${p => p.theme.styles.colors.white};
  border-radius: ${p => p.theme.styles.borderRadius.small};
  border: 2px solid ${p => p.theme.styles.colors.white}80;
  border-color: ${p => p.error && p.theme.styles.colors.red};
  background-color: ${p => p.theme.styles.colors.white}19;
  transition: .2s;

  :focus {
    background-color: gray;
  }
`


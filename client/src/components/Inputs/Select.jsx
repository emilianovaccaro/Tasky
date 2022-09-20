import React from 'react'
import styled from 'styled-components'
import { Label } from '../Text/Label'
import { SubLabel } from '../Text/SubLabel'

export const Select = ( {inputLabel, name, onChange, id, error, children, touched} ) => {
  return(
    <InputBoxContainer>
      <div>
        <Label marginBottom={'16px'} htmlFor={id}>{inputLabel}</Label>
        {touched && error &&  <SubLabel error>{error}</SubLabel>}
      </div>
      <InputSelect
        id={id}
        name={name}
        onChange={onChange}
        error={error}
      >
        {children}
      </InputSelect>
    </InputBoxContainer>
  )
}

const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 74px;
  @media screen and (min-width: ${p => p.theme.styles.breakpoints.medium}) {
    max-width: calc(50% - 10px);
    max-width: ${p => p.fullWidth && '100%'};
  }
`

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
  flex: 1;

  :focus {
    background-color: gray;
  }
`


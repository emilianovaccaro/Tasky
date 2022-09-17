import React from 'react'
import styled from 'styled-components'
import { Label } from '../Text/Label'

export const TextArea = ( {inputLabel, name, onChange, value, id, error, maxLength} ) => {
  return(
    <>
      <Label marginBottom={'16px'} htmlFor={id}>{inputLabel}</Label>
      {error && <Label error>{error}</Label>}
      <InputTextArea
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        error={error}
        maxLength={maxLength}
      />
    </>
  )
}

const InputTextArea = styled.textarea`
  outline: 0;
  resize: none;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: ${p => p.theme.styles.padding.small};
  font-weight: ${p => p.theme.styles.fontWeight.medium};
  color: ${p => p.theme.styles.colors.white};
  border-radius: ${p => p.theme.styles.borderRadius.small};
  border: 2px solid ${p => p.theme.styles.colors.white}80;
  border-color: ${p => p.error && p.theme.styles.colors.red};
  background-color: ${p => p.theme.styles.colors.white}19;
  transition: .2s;

  :focus {
    border-color: ${p => p.error ? p.theme.styles.colors.red : p.theme.styles.colors.white};
  }

`
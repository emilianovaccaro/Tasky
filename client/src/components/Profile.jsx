import React from 'react'
import styled from 'styled-components'

import { Label } from './Text/Label'
import { SubLabel } from './Text/SubLabel'

export const Profile = ({imagePath, imageSize, labelText, subLabelText}) => {
  return(
    <ProfileContainer imageSize={imageSize}>
      <img src={imagePath} alt='Profile picture' />
      <ProfileInfoContainer>
        {labelText && <Label semiBold>{labelText}</Label>}
        {subLabelText && <SubLabel lowOpacity>{subLabelText}</SubLabel>}
      </ProfileInfoContainer>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: ${p => p.imageSize}px;
    height: ${p => p.imageSize}px;
    margin-right: 8px;
    border-radius: ${p => p.theme.styles.borderRadius.large};
  }

`

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
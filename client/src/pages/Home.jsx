import React from 'react'

import { SubLabel } from '../components/Text/SubLabel'
import { Label } from '../components/Text/Label'
import { SubTitle } from '../components/Text/SubTitle'
import { Title } from '../components/Text/Title'
import { Icon, icons } from '../components/Icon'
import { TextButtonExtraSmall } from '../components/Button/TextButtonExtraSmall'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import { TextButtonMedium } from '../components/Button/TextButtonMedium'
import { IconButton } from '../components/Button/IconButton'
import { BoxButton } from '../components/Button/BoxButton'

export const Home = () => {
  return (
    <>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <SubLabel>SubLabel 100% opacity</SubLabel>
        <SubLabel lowOpacity>SubLabel 50% opacity</SubLabel>
        <SubLabel button>SubLabel Button</SubLabel>
        <SubLabel priority lowPriority>Low Priority</SubLabel>
        <SubLabel priority mediumPriority>Medium Priority</SubLabel>
        <SubLabel priority highPriority>High Priority</SubLabel>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <Label>Label regular</Label>
        <Label semiBold>Label semiBold</Label>
        <Label button>Label button</Label>
        <Label button icon><Icon as={icons.instagram} />Label button icon</Label>
        <Label button icon><Icon as={icons.instagram} size={32} />Label button icon</Label>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <SubTitle>Subtitle</SubTitle>
        <SubTitle icon><Icon as={icons.instagram} size={32} />Subtitle icon</SubTitle>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <Title>Title</Title>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <TextButtonExtraSmall to="/login">Text Button Extra Small</TextButtonExtraSmall>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <TextButtonSmall to="/login">Text Button Small</TextButtonSmall>
        <TextButtonSmall to="/login" error={'este es el error'}>Text Button Small Error</TextButtonSmall>
        <TextButtonSmall to="/login" semiBold><Icon as={icons.instagram} />Text Button Small SemiBold Icon</TextButtonSmall>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <TextButtonMedium><Icon as={icons.instagram} /> Text Button Medium Icon Left</TextButtonMedium>
        <TextButtonMedium lowOpacity><Icon as={icons.instagram} />Text Button Medium Icon Left low Opacity</TextButtonMedium>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <IconButton><Icon as={icons.instagram} white /></IconButton>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <BoxButton><Label black medium>BoxButton</Label></BoxButton>
      </div>
    </>
  )
}
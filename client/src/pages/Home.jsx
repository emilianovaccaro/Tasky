import React from 'react'

import { SubLabel } from '../components/SubLabel'
import { Label } from '../components/Label'
import { Icon, icons } from '../components/Icon'

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
        <Label button icon><Icon as={icons.instagram} size={64} />Label button icon</Label>
      </div>
    </>
  )
}
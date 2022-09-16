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
import { Card } from '../components/Card/Card'
import { TaskCard } from '../components/Card/TaskCard'
import { Input } from '../components/Inputs/Input'

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
        <Label button icon><Icon as={icons.eye} />Label button icon</Label>
        <Label button icon><Icon as={icons.eye} size={32} />Label button icon</Label>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <SubTitle>Subtitle</SubTitle>
        <SubTitle icon><Icon as={icons.eye} size={32} />Subtitle icon</SubTitle>
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
        <TextButtonSmall to="/login" semiBold><Icon as={icons.eye} />Text Button Small SemiBold Icon</TextButtonSmall>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <TextButtonMedium><Icon as={icons.eye} /> Text Button Medium Icon Left</TextButtonMedium>
        <TextButtonMedium lowOpacity><Icon as={icons.eye} />Text Button Medium Icon Left low Opacity</TextButtonMedium>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <IconButton><Icon as={icons.eye} white={'white'} /></IconButton>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <BoxButton><Label black medium>BoxButton</Label></BoxButton>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <Card headerChildren={'Hola'} defaultColor>
          <Label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur consequuntur aperiam sunt itaque provident id nam assumenda! Laborum delectus recusandae, dolore quia temporibus ut. Optio et illum consequuntur veritatis?</Label>
        </Card>
        <Card headerChildren={<Label semiBold>Hola mundo</Label>} />
        <Card SubTitleText={'Título card'}>
          <Label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur consequuntur aperiam sunt itaque provident id nam assumenda! Laborum delectus recusandae, dolore quia temporibus ut. Optio et illum consequuntur veritatis?</Label>
        </Card>
        <Card comment>
          <Label>Comentario</Label>
          <SubLabel>Comentario ario ario ario ario</SubLabel>
        </Card>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <TaskCard status={'finished'}>
          <Label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur consequuntur aperiam sunt itaque provident id nam assumenda! Laborum delectus recusandae, dolore quia temporibus ut. Optio et illum consequuntur veritatis?</Label>
        </TaskCard>
        <TaskCard status={'inProgress'}>
          <Label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur consequuntur aperiam sunt itaque provident id nam assumenda! Laborum delectus recusandae, dolore quia temporibus ut. Optio et illum consequuntur veritatis?</Label>
        </TaskCard>
        <TaskCard status={'toDo'}>
          <Label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur consequuntur aperiam sunt itaque provident id nam assumenda! Laborum delectus recusandae, dolore quia temporibus ut. Optio et illum consequuntur veritatis?</Label>
        </TaskCard>
      </div>
      <div style={{'padding': '50px', 'display': 'flex', 'gap': '20px' , 'alignItems': 'center'}}>
        <Card>
          <Input type={'email'} inputLabel={'Ingrese su email'} />
          <Input type={'text'} inputLabel={'Ingrese su email'} error={'email incorrecto'} />
          <Input type={'tel'} inputLabel={'Ingrese su teléfono'} />
          <Input type={'password'} inputLabel={'Ingrese su contraseña'} error={'contraseña incorrecta'} />
        </Card>
      </div>
    </>
  )
}
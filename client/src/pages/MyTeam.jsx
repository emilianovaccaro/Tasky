import React from 'react'
import { Content } from '../components/Content'
import { useSelector } from 'react-redux'
import { Spinner } from '../components/Spinner'
import { Profile } from '../components/Profile'
import { Card } from '../components/Card/Card'
import { Label } from '../components/Text/Label'
import { Icon, icons } from '../components/Icon'


export const MyTeam = () => {
  const { team } = useSelector(state => state.user)

  return (
    <>
      <Content>
        { team?.length > 0 ? ( team?.map((person) => (
          <Card key={person._id}  headerChildren={
            <Profile 
              imagePath={person.profilePhoto}
              imageSize={24}
              labelText={person.username}
            />
          }>
            <Label icon><Icon as={icons.phone} />{person.phone}</Label>
            <Label icon><Icon as={icons.email} />{person.email}</Label>
            <Label icon><Icon as={icons.role} />{person.role}</Label>
          </Card>
        )))
          :  (<Spinner />)
        } 
      </Content>
    </>
  )
}
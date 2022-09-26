import React from 'react'
import { Content } from '../components/Content'
import { useSelector } from 'react-redux'
import { Spinner } from '../components/Spinner'
import { Profile } from '../components/Profile'
import { Card } from '../components/Card/Card'
import { Label } from '../components/Text/Label'
import { Icon, icons } from '../components/Icon'
import { Title } from '../components/Text/Title'
import styled from 'styled-components'

export const MyTeam = () => {
  const { team } = useSelector(state => state.user)

  return (
    <>
      <Content>
        <Title>Mi equipo</Title>
        <TeamList>
          { team?.length > 0 ? ( team?.map((person) => (
            <Card key={person._id} headerChildren={
              <Profile
                imagePath={person.profilePhoto}
                imageSize={24}
                labelText={person.fullname}
              />
            }>
              <Label icon><Icon mr='16' as={icons.phone} />{person.phone}</Label>
              <Label icon><Icon mr='16' as={icons.email} />{person.email}</Label>
              <Label icon><Icon mr='16' as={icons.role} />{person.role}</Label>
            </Card>
          )))
            :  (<Spinner />)
          } 
        </TeamList>
      </Content>
    </>
  )
}

const TeamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  padding-bottom: 24px;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    flex-direction: column;
  }
`
import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-family: Arial;
  font-size: 18px;
  font-weight: 600;
  color: #000;
`

const Description = styled.div`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  padding: 20px 0;
`

const Assignee = styled.div`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  padding: 10px 0;
`

const Vacancy = ({ assignee, id, title, description }) => (
  <Container>
    <Link to={`/vacancies/${id}/edit`}>Редактировать</Link>
    <Title>{title}</Title>
    <Description>{description}</Description>
    ответственный:
    {assignee.map(user => <Assignee key={user.id}>{user.name}</Assignee>)}
  </Container>
)

const mapStateToProps = ({
  entities: { users, vacancies },
  router: { location }
}) => {
  const id = location.pathname.split('/')[2]

  return {
    ...vacancies[id],

    assignee: vacancies[id].assignees.map(id => users[id])
  }
}

export default connect(mapStateToProps)(Vacancy)

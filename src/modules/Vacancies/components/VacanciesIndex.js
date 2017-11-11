import React from 'react'
import styled from 'react-emotion'
import { parse } from 'qs'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VacancyCard from './VacancyCard'
import { toArray } from '../../../store/utils'

const VacanciesConteiner = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Head = styled.div`
  display: flex; 
  padding: 20px;
  justify-content: space-between;
`

const Filter = styled.div`
  display: flex;
  flex-direction: column;
`

const VacanciesIndex = ({ users, vacancies }) => [
  <Head key='one'>
    <Filter>
      <Link to={`/vacancies`}> Всё </Link>

      {users.map(user => (
        <Link key={user.id} to={`?assignee=${user.id}`}> {user.name} </Link>
      ))}
    </Filter>

    <Link to='/vacancies/create'>
      Добавить вакансию
    </Link>
  </Head>,

  <VacanciesConteiner key='two'>
    {vacancies.map(vacancy => <VacancyCard {...vacancy} key={vacancy.id} />)}
  </VacanciesConteiner>
]

const mapStateToProps = ({
  entities: { users, vacancies },
  router: { location }
}) => {
  const { assignee: assignedUser } = location.search
    ? parse(location.search, { ignoreQueryPrefix: true })
    : { assignee: null }

  return {
    users: toArray(users),
    vacancies: toArray(vacancies).filter(
      vacancy => !assignedUser || vacancy.assignees.includes(+assignedUser)
    )
  }
}

export default connect(mapStateToProps)(VacanciesIndex)

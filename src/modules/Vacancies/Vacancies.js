import React from 'react'
import styled from 'react-emotion'
import { fetchUsers, fetchVacancies } from './redux'
import { renderRoutes } from 'react-router-config'

const Conteiner = styled.div`
  display: grid;

  grid-template-columns: minmax(min-content, 600px);
  grid-template-rows: min-content 1fr;
  grid-gap: 20px;

  justify-content: center;

  height: 100%;
  box-sizing: border-box;
  padding: 20px;
`

const Vacancies = ({ route }) => (
  <Conteiner>
    {renderRoutes(route.routes)}
  </Conteiner>
)

Vacancies.fetchData = ({ dispatch, getState }) => {
  const { views: { users, vacancies } } = getState()

  return [
    users.loaded || dispatch(fetchUsers()),
    vacancies.loaded || dispatch(fetchVacancies())
  ]
}

export default Vacancies

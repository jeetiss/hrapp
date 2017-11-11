import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  App,
  Vacancies,
  VacanciesIndex,
  VacancyPage,
  VacancyForm
} from './modules'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: () => <Redirect to='/vacancies' />,
        exact: true
      },
      {
        path: '/vacancies',
        component: Vacancies,
        routes: [
          {
            path: '/vacancies',
            component: VacanciesIndex,
            exact: true
          },
          {
            path: '/vacancies/create',
            component: VacancyForm,
            exact: true
          },
          {
            path: '/vacancies/:id',
            component: VacancyPage,
            exact: true
          },
          {
            path: '/vacancies/:id/edit',
            component: VacancyForm,
            exact: true
          }
        ]
      }
    ]
  }
]

export default routes

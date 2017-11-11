import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { users, vacancies, loadedUsers, loadedVacancies } from './Vacancies/redux'

export default combineReducers({
  views: combineReducers({
    users: loadedUsers,
    vacancies: loadedVacancies
  }),

  entities: combineReducers({
    users,
    vacancies
  }),

  router: routerReducer
})

export { default as App } from './App'
export {
  default as Vacancies,
  VacanciesIndex,
  VacancyPage,
  VacancyForm
} from './Vacancies'

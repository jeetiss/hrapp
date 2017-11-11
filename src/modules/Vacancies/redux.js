import { schema } from 'normalizr'
import { push } from 'react-router-redux'
import { fetchAction } from '../../store/utils'
import { entitiesReducer, loadedReducer } from '../../store/reducers'

// Actions.
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const FETCH_VACANCIES_REQUEST = 'FETCH_VACANCIES_REQUEST'
const FETCH_VACANCIES_SUCCESS = 'FETCH_VACANCIES_SUCCESS'
const FETCH_VACANCIES_FAILURE = 'FETCH_VACANCIES_FAILURE'

const CREATE_VACANCY_REQUEST = 'CREATE_VACANCY_REQUEST'
const CREATE_VACANCY_FAILURE = 'CREATE_VACANCY_FAILURE'

const EDIT_VACANCY_REQUEST = 'EDIT_VACANCY_REQUEST'
const EDIT_VACANCY_FAILURE = 'EDIT_VACANCY_FAILURE'

// Schemas.
const user = new schema.Entity('users')

const vacancy = new schema.Entity('vacancies', {
  assignee: [user]
})

// Creators.
export const fetchUsers = fetchAction(
  '/api/users',
  [FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
  user
)

export const fetchVacancies = fetchAction(
  '/api/vacancies',
  [FETCH_VACANCIES_REQUEST, FETCH_VACANCIES_SUCCESS, FETCH_VACANCIES_FAILURE],
  vacancy
)

export const createVacancy = fetchAction(
  '/api/vacancies',
  [CREATE_VACANCY_REQUEST, () => push('/vacancies'), CREATE_VACANCY_FAILURE],
  vacancy
)

export const editVacancy = fetchAction(
  ({ id }) => `/api/vacancies/${id}`,
  [EDIT_VACANCY_REQUEST, () => push('/vacancies'), EDIT_VACANCY_FAILURE],
  vacancy
)

// Redusers.
export const users = entitiesReducer({
  key: 'users'
})

export const loadedUsers = loadedReducer([
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
])

export const vacancies = entitiesReducer({
  key: 'vacancies'
})

export const loadedVacancies = loadedReducer([
  FETCH_VACANCIES_REQUEST,
  FETCH_VACANCIES_SUCCESS,
  FETCH_VACANCIES_FAILURE
])

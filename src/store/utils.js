import fetch from 'isomorphic-fetch'
import { normalize } from 'normalizr'
import { ADD_ENTITIES } from './reducers'

export const addEntities = response => ({
  type: ADD_ENTITIES,
  payload: response
})

export const toArray = obj => Object.keys(obj).map(key => obj[key])

const makeAction = arg =>
  (typeof arg === 'string' ? payload => ({ type: arg, payload }) : arg)

export const fetchAction = (urlGetter, types, schema) => ({ body, params } = {}) => dispatch => {
  const url = typeof urlGetter === 'string' ? urlGetter : urlGetter(params)
  const [request, success, failure] = types.map(makeAction)
  const method = body ? params ? 'PUT' : 'POST' : 'GET'

  dispatch(request())

  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(response => (body ? [response] : response))
    .then(response => normalize(response, [schema]))
    .then(response => {
      dispatch(addEntities(response))

      dispatch(success(response))
    })
    .catch(error =>
      dispatch(failure(error.message))
    )
}

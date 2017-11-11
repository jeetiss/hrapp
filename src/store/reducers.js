// Actions.

export const ADD_ENTITIES = 'ADD_ENTITIES'
export const REMOVE_ENTITIES = 'REMOVE_ENTITIES'

// Reducers.

export const entitiesReducer = ({ key }) => (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ENTITIES:
      return payload.entities[key]
        ? { ...state, ...payload.entities[key] }
        : state

    default:
      return state
  }
}

const defaultState = { loaded: false, loading: false, error: false }
export const loadedReducer = ([REQUEST, SUCCESS, FAILURE]) => (
  state = defaultState,
  { type }
) => {
  switch (type) {
    case REQUEST:
      return { ...state, loading: true }
    case SUCCESS:
      return { ...state, loaded: true, loading: false }
    case FAILURE:
      return { ...state, loading: false, error: true }

    default:
      return state
  }
}

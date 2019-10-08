import {
  ADD_PROJECT,
  EDIT_PROJECT,
  UPDATE_PROJECT,
  CLEAR_CURRENT_SELECTION,
  GET_PROJECT,
  PROJECT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PROJECT:
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case EDIT_PROJECT:
      return {
        ...state,
        projectId: action.payload
      };
    case GET_PROJECT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_CURRENT_SELECTION:
      return {
        ...state,
        current: null,
        projectId: null,
        loading: false
      };
    default:
      return state;
  }
};

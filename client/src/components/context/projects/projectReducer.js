import {
  ADD_PROJECT,
  ON_EDIT_PROJECT,
  ON_REMOVE_PROJECT,
  ON_PUBLISH_PROJECT,
  ON_UNPUBLISH_PROJECT,
  REMOVE_PROJECT,
  UPDATE_PROJECT,
  PUBLISH_PROJECT,
  UNPUBLISH_PROJECT,
  CLEAR_CURRENT_SELECTION,
  GET_PROJECT,
  PROJECT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PROJECT:
    case UPDATE_PROJECT:
    case REMOVE_PROJECT:
    case PUBLISH_PROJECT:
    case UNPUBLISH_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case ON_EDIT_PROJECT:
      return {
        ...state,
        projectId: action.payload,
        showEdit: true
      };
    case ON_REMOVE_PROJECT:
      return {
        ...state,
        projectId: action.payload,
        showRemove: true
      };
    case ON_PUBLISH_PROJECT:
      return {
        ...state,
        projectId: action.payload,
        showPublish: true
      };
    case ON_UNPUBLISH_PROJECT:
      return {
        ...state,
        projectId: action.payload,
        showUnpublish: true
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
        loading: false,
        showEdit: false,
        showRemove: false,
        showPublish: false,
        showUnpublish: false
      };
    default:
      return state;
  }
};

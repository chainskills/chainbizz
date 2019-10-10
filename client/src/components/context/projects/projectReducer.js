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
  OFFER_SERVICES,
  ACCEPT_PROPOSAL,
  REJECT_PROPOSAL,
  ACCEPT_SERVICES,
  REJECT_SERVICES,
  VALIDATE_SERVICES,
  LEAVE_SERVICES,
  CANCEL_SERVICES,
  ON_OFFER_SERVICES,
  ON_ACCEPT_PROPOSAL,
  ON_REJECT_PROPOSAL,
  ON_VALIDATE_SERVICES,
  ON_ACCEPT_SERVICES,
  ON_REJECT_SERVICES,
  ON_LEAVE_SERVICES,
  ON_CANCEL_SERVICES,
  PROJECT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PROJECT:
    case UPDATE_PROJECT:
    case REMOVE_PROJECT:
    case PUBLISH_PROJECT:
    case UNPUBLISH_PROJECT:
    case OFFER_SERVICES:
    case ACCEPT_SERVICES:
    case REJECT_SERVICES:
    case VALIDATE_SERVICES:
    case ACCEPT_PROPOSAL:
    case REJECT_PROPOSAL:
    case LEAVE_SERVICES:
    case CANCEL_SERVICES:
    case ACCEPT_SERVICES:
    case REJECT_SERVICES:
    case VALIDATE_SERVICES:
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
    case ON_OFFER_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showOfferServices: true
      };
    case ON_ACCEPT_PROPOSAL:
      return {
        ...state,
        projectId: action.payload,
        showAcceptProposal: true
      };
    case ON_REJECT_PROPOSAL:
      return {
        ...state,
        projectId: action.payload,
        showRejectProposal: true
      };
    case ON_VALIDATE_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showValidateServices: true
      };
    case ON_ACCEPT_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showAcceptServices: true
      };
    case ON_REJECT_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showRejectServices: true
      };
    case ON_LEAVE_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showLeaveServices: true
      };
    case ON_CANCEL_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showCancelServices: true
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
        showUnpublish: false,
        showOfferServices: false,
        showAcceptProposal: false,
        showRejectProposal: false,
        showValidateServices: false,
        showAcceptServices: false,
        showRejectServices: false,
        showLeaveServices: false,
        showCancelServices: false
      };
    default:
      return state;
  }
};

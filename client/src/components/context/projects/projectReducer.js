import {
  IS_ENABLED,
  ADD_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
  PUBLISH_PROJECT,
  UNPUBLISH_PROJECT,
  ON_EDIT_PROJECT,
  ON_REMOVE_PROJECT,
  ON_PUBLISH_PROJECT,
  ON_UNPUBLISH_PROJECT,
  SUBMIT_OFFER,
  CANCEL_OFFER,
  ACCEPT_PROPOSAL,
  REJECT_PROPOSAL,
  ON_SUBMIT_OFFER,
  ON_CANCEL_OFFER,
  ON_ACCEPT_PROPOSAL,
  ON_REJECT_PROPOSAL,
  DELIVER_PROJECT,
  CANCEL_SERVICES,
  ACCEPT_DELIVERY,
  REJECT_DELIVERY,
  CANCEL_CONTRACT,
  ON_DELIVER_PROJECT,
  ON_CANCEL_SERVICES,
  ON_ACCEPT_DELIVERY,
  ON_REJECT_DELIVERY,
  ON_CANCEL_CONTRACT,
  ON_CANCEL_MODAL,
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
    case SUBMIT_OFFER:
    case CANCEL_OFFER:
    case ACCEPT_PROPOSAL:
    case REJECT_PROPOSAL:
    case DELIVER_PROJECT:
    case CANCEL_SERVICES:
    case ACCEPT_DELIVERY:
    case REJECT_DELIVERY:
    case CANCEL_CONTRACT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case IS_ENABLED:
      return {
        ...state,
        enabled: action.payload
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
    case ON_SUBMIT_OFFER:
      return {
        ...state,
        projectId: action.payload,
        showSubmitOffer: true
      };
    case ON_CANCEL_OFFER:
      return {
        ...state,
        projectId: action.payload,
        showCancelOffer: true
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
    case ON_DELIVER_PROJECT:
      return {
        ...state,
        projectId: action.payload,
        showDeliverProject: true
      };
    case ON_CANCEL_SERVICES:
      return {
        ...state,
        projectId: action.payload,
        showCancelServices: true
      };
    case ON_ACCEPT_DELIVERY:
      return {
        ...state,
        projectId: action.payload,
        showAcceptDelivery: true
      };
    case ON_REJECT_DELIVERY:
      return {
        ...state,
        projectId: action.payload,
        showRejectDelivery: true
      };
    case ON_CANCEL_CONTRACT:
      return {
        ...state,
        projectId: action.payload,
        showCancelContract: true
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
    case ON_CANCEL_MODAL:
      return {
        ...state,
        showEdit: false,
        showRemove: false,
        showPublish: false,
        showUnpublish: false,
        showSubmitOffer: false,
        showCancelOffer: false,
        showAcceptProposal: false,
        showRejectProposal: false,
        showDeliverProject: false,
        showCancelServices: false,
        showAcceptDelivery: false,
        showRejectDelivery: false,
        showCancelContract: false
      };
    case CLEAR_CURRENT_SELECTION:
      return {
        ...state,
        current: null,
        projectId: null,
        loading: false,
        sshowEdit: false,
        showRemove: false,
        showPublish: false,
        showUnpublish: false,
        showSubmitOffer: false,
        showCancelOffer: false,
        showAcceptProposal: false,
        showRejectProposal: false,
        showDeliverProject: false,
        showCancelServices: false,
        showAcceptDelivery: false,
        showRejectDelivery: false,
        showCancelContract: false
      };
    default:
      return state;
  }
};

import { ACTIONS, STATUS } from './actions';
import { combineReducers } from 'redux';

const apod = (state = {}, action) => {
  switch (action.type) {
  case ACTIONS.RECEIVE_APOD:
    return action.apod;
  default:
    return state;
  }
};

const requestStatus = (state = STATUS.LOADING, action) => {
  switch(action.type) {
    case ACTIONS.SET_REQUEST_STATUS:
      return action.requestStatus;
    default:
      return state;
  }
};

const reducers = combineReducers({
  apod,
  requestStatus
});

export default reducers;
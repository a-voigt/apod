import fetch from 'isomorphic-fetch';

export const ACTIONS = {
  SET_REQUEST_STATUS: 'SET_REQUEST_STATUS',
  RECEIVE_APOD: 'RECEIVE_APOD',
};

export const STATUS = {
  LOADING: 'LOADING',
  FINISHED: 'FINISHED'
}

const setRequestStatus = (status) => {
  return {
    type: ACTIONS.SET_REQUEST_STATUS,
    requestStatus: status 
  };
}

const receiveAPOD = (json) => {
  return {
    type: ACTIONS.RECEIVE_APOD,
    apod: json
  }
};

export const fetchAPOD = (apodDate) => {  
  return (
    (dispatch) => {
      dispatch(setRequestStatus(STATUS.LOADING));
      return fetch(`/apod/${apodDate}`)
        .then(response => response.json())
        .then(json => dispatch(receiveAPOD(json)))
        .then(() => dispatch(setRequestStatus(STATUS.FINISHED)));
    }
  );
};
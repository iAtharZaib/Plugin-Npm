import * as actionTypes from '../actions/actionTypes';

const initialState = {
  languageID: 1,
  languageName: 'English',
  resource: {},
  feedbackID: 0,
  apiLink: 'https://uat-api-plugin.ajman.ae/api/create_feedback/',
};

const resourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        languageID: action.languageID,
        languageName: action.languageName,
        resource: action.resource,
      };
    case actionTypes.SET_FEEDBACKID:
      return {
        ...state,
        feedbackID: action.data,
      };
    default:
      return state;
  }
};

export default resourcesReducer;

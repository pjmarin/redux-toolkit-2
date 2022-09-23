import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from '../../node_modules/redux-logger/src/index.js';
import { ActionsTypes } from './actions/actions.constants.js';

const defaultState = {
  originalAmount: 0,
  posts: []
};

function amount(state = defaultState, action) {
  switch(action.type) {
    case ActionsTypes.INCREMENT_ORIGIN_AMOUNT: {
      return {...state, originalAmount: state.originalAmount + action.data.newAmount};
    }

    case ActionsTypes.DECREMENT_ORIGIN_AMOUNT: {
      return {...state, originalAmount: state.originalAmount - action.data.newAmount};
    }

    case ActionsTypes.REQUEST_POSTS_SUCCESSFULLY_RECEIVED: {
      return {...state, posts: action.data.posts}
    }

    default: {
      return state;
    }
  }
}

const store = createStore(amount, applyMiddleware(thunk, logger));

export default store;
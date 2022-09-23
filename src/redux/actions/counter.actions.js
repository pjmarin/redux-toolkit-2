import { ActionsTypes } from './actions.constants.js';

export function incrementOriginAmount(amount) {
  return { type: ActionsTypes.INCREMENT_ORIGIN_AMOUNT, data: { newAmount: amount } }
}

export function decrementOriginAmount(amount) {
    return { type: ActionsTypes.DECREMENT_ORIGIN_AMOUNT, data: { newAmount: amount } }
}

export function someAction() {
  return { type: ActionsTypes.SOME_ACTION, data: 'some data' }
}

export function requestPostsSuccessfullyReceived(json) {
  return { type: ActionsTypes.REQUEST_POSTS_SUCCESSFULLY_RECEIVED, data: { posts: json } }
}
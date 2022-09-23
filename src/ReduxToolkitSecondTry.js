import { LitElement, html } from 'lit';
// import { createStore } from 'redux';
import store from './redux/store.js';

// import { incrementOriginAmount, someAction, requestPostsSuccessfullyReceived } from './redux/actions/counter.actions.js';
import * as Actions from './redux/actions/counter.actions.js';

export class ReduxToolkitSecondTry extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
      defaultState: { type: Number },
      store: { type: Number },
      counter: { type: Number }
    }
  }

  constructor() {
    super();
    this.defaultState = store.getState().originalAmount;
  }

  // eslint-disable-next-line class-methods-use-this
  increment() {
    // store.dispatch({ type: 'INCREMENT ORIGIN AMOUNT', data: { newAmount: 1 } });
    store.dispatch(Actions.incrementOriginAmount(1));
    
    store.dispatch(dispatch => {
      dispatch(Actions.someAction());

      setTimeout(() => dispatch(Actions.incrementOriginAmount(500)), 3000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  decrement() {
    store.dispatch(Actions.decrementOriginAmount(1));
  }

  // eslint-disable-next-line class-methods-use-this
  getPosts() {
    store.dispatch(dispatch => {
      dispatch({ type: 'REQUEST POSTS' });

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
        dispatch(Actions.requestPostsSuccessfullyReceived(json));

        store.subscribe(() => { console.log('state', store.getState()); this.posts = store.getState().posts;});
      });
    });
  }

  connectedCallback() {
    super.connectedCallback();

  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then((response) => response.json())
  //   .then((json) => {
  //     this.posts = json;
  //     console.log(json);
  //     store.subscribe(() => { console.log('state', store.getState()); this.defaultState = store.getState().originalAmount;});
  //   });

    store.subscribe(() => { console.log('state', store.getState()); this.defaultState = store.getState().originalAmount;});
  }
  
  render() {
    return html`
      <div class="container">
        <h1>Contador</h1>
        <span class="contador">${this.defaultState}</span>
        <div class="container-buttons">
          <button @click="${this.increment}">increment</button>
          <button @click="${this.decrement}">decrement</button>
          <button @click="${this.getPosts}">get posts</button>
        </div>
        <ul>
          ${this.posts ? this.posts.map(post => html`<li>${post.title}</li>`) : html`loading`}
        </ul>
      </div>
    `;
  }
}
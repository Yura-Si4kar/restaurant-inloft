import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    createLogger({
      collapsed: true,
    }),
  ),
);

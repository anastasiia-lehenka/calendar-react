import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import eventsReducer from './events/reducer';
import usersReducer from './users/reducer';
import notificationsReducer from './notifications/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({
  events: eventsReducer,
  users: usersReducer,
  notifications: notificationsReducer,
}), composeEnhancers(applyMiddleware(thunk)));

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Calendar from './containers/calendar';
import CreateEvent from './containers/createEvent';
import { getEvents } from './store/events/actions';
import { changeCurrentUser, getUsers } from './store/users/actions';
import { getUserData } from './services/sessionStorageApi';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    const authorizedUser = getUserData();
    if (authorizedUser) {
      dispatch(changeCurrentUser(authorizedUser));
    } else {
      dispatch(changeCurrentUser(null));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/create-event" component={CreateEvent} />
          <Route path="/">
            <Redirect to="/calendar" />
          </Route>
        </Switch>
        <Container className="toast-container">
          { notifications.map((notification) => <Notification key={notification.id} data={notification} />)}
        </Container>
      </Router>
    </div>
  );
};

export default App;

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Calendar from './pages/calendar';
import CreateEvent from './pages/createEvent';
import Notification from './components/Notification';
import AuthModal from './components/modals/AuthModal';
import service from './services/NotificationsDecorator';
import UserContext from './UserContext';
import { deleteUserData, getUserData, setUserData } from './services/sessionStorageApi';

const App = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(true);
  const [filter, setFilter] = useState('All members');

  useEffect(() => {
    const authorizedUser = getUserData();
    setCurrentUser(authorizedUser);
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const response = await service.getEvents();
      setEvents(response.data);
      setNotifications((prevValue) => [...prevValue, response.notification]);
    };

    const getUsers = async () => {
      const response = await service.getUsers();
      setUsers(response.data);
      setNotifications((prevValue) => [...prevValue, response.notification]);
    };

    getUsers();
    getEvents();
  }, []);

  const createEvent = async (eventData) => {
    const response = await service.createEvent(eventData);
    if (response.data) {
      setEvents((prevValue) => {
        if (prevValue && prevValue.length) {
          return [...prevValue, response.data];
        }
        return [response.data];
      });
    }
    setNotifications((prevValue) => [...prevValue, response.notification]);
    return response.data;
  };

  const deleteEvent = useCallback(async (eventId) => {
    setEventToDelete(null);

    const response = await service.deleteEvent(eventId);

    if (response.data) {
      setEvents((prevValue) => prevValue.filter((event) => event.id !== eventId));
    }

    setNotifications((prevValue) => [...prevValue, response.notification]);
  }, []);

  const showDeleteModal = useCallback((event) => {
    setEventToDelete(event);
  }, []);

  const cancelDelete = useCallback(() => {
    setEventToDelete(null);
  }, []);

  const confirmAuth = useCallback((user) => {
    if (user) {
      setCurrentUser(user);
      setUserData(user);
    }
  }, []);

  const logOut = useCallback(() => {
    setCurrentUser(null);
    setFilter('All members');
    deleteUserData();
  }, []);

  const filterUsers = useCallback((e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  }, []);

  const isExistingEvent = (eventDay, eventTime) => (
    events && events.find((userEvent) => userEvent.day === eventDay && userEvent.time === eventTime)
  );

  const currentUserValue = useMemo(() => [currentUser, setCurrentUser], [currentUser]);

  const filteredEvents = useMemo(() => (
    filter !== 'All members' && events ? events.filter((userEvent) => userEvent.participants.includes(filter)) : events
  ), [events, filter]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <UserContext.Provider value={currentUserValue}>
          <Switch>
            <Route exact path="/calendar">
              { !currentUser
                ? <AuthModal confirmAuth={confirmAuth} users={users} />
                : (
                  <Calendar
                    users={users}
                    events={filteredEvents}
                    showDeleteModal={showDeleteModal}
                    eventToDelete={eventToDelete}
                    cancelDelete={cancelDelete}
                    deleteEvent={deleteEvent}
                    confirmAuth={confirmAuth}
                    logOut={logOut}
                    filterUsers={filterUsers}
                    filter={filter}
                  />
                )}
            </Route>
            <Route exact path="/create-event">
              <CreateEvent users={users} isExistingEvent={isExistingEvent} createEvent={createEvent} />
            </Route>
            <Route path="/">
              <Redirect to="/calendar" />
            </Route>
          </Switch>
        </UserContext.Provider>
        { notifications && (
          <Container className="toast-container">
            { notifications.map((notification) => <Notification key={notification.id} data={notification} />)}
          </Container>
        )}
      </div>
    </Router>
  );
};

export default App;

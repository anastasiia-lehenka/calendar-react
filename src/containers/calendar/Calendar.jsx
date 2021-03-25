import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { changeEventsFilter, deleteEvent, changeEventToDelete } from '../../store/events/actions';
import { changeCurrentUser } from '../../store/users/actions';
import { setUserData, deleteUserData } from '../../services/sessionStorageApi';
import UsersSelect from '../../components/UsersSelect/UsersSelect';
import CalendarTable from '../../components/CalendarTable/CalendarTable';
import DeleteModal from '../../components/modals/DeleteModal/DeleteModal';
import AuthModal from '../../components/modals/AuthModal';
import './styles.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);
  const events = useSelector((state) => state.events.events);
  const eventsFilter = useSelector((state) => state.events.filter);
  const eventToDelete = useSelector((state) => state.events.eventToDelete);

  const confirmAuth = (user) => {
    if (user) {
      dispatch(changeCurrentUser(user));
      setUserData(user);
      if (user.admin) {
        dispatch(changeEventsFilter('All members'));
      } else {
        dispatch(changeEventsFilter(user.name));
      }
    }
  };

  const logOut = () => {
    dispatch(changeCurrentUser(null));
    deleteUserData();
  };

  const removeEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
    dispatch(changeEventToDelete(null));
  };

  const filteredEvents = useMemo(() => (
    (eventsFilter !== 'All members' && events)
      ? events.filter((userEvent) => userEvent.participants.includes(eventsFilter))
      : events
  ), [events, eventsFilter]);

  const changeFilter = useCallback((e) => dispatch(changeEventsFilter(e.target.value)), [dispatch]);

  const setEventToDelete = useCallback((eventId) => dispatch(changeEventToDelete(eventId)), [dispatch]);

  return (
    !currentUser
      ? <AuthModal confirmAuth={confirmAuth} users={users} />
      : (
        <>
          <Container fluid className="wrapper pt-3">
            <Row className="mb-3">
              <Col className="auth-info d-flex justify-content-end align-items-center">
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <p>You are logged in as <strong>{currentUser.name}</strong></p>
                <Button variant="danger" size="sm" onClick={logOut}>Logout</Button>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <h2 className="heading mb-3 mb-md-0">Calendar</h2>
              </Col>
              { currentUser.admin && (
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-md-end">
                  <UsersSelect
                    className="users-select"
                    users={users}
                    onChange={changeFilter}
                    value={eventsFilter}
                    hasDefaultOption
                  />
                  <Link to="/create-event">
                    <Button className="new-event-button btn-light"
                      variant="outline-secondary"
                      role="button"
                    >
                      New event +
                    </Button>
                  </Link>
                </div>
              </Col>
              )}
            </Row>
            <CalendarTable
              currentUser={currentUser}
              events={filteredEvents}
              showDeleteModal={setEventToDelete}
            />
          </Container>
          { eventToDelete && (
            <DeleteModal
              event={eventToDelete}
              deleteEvent={removeEvent}
              cancelDelete={() => dispatch(changeEventToDelete(null))}
            />
          )}
        </>
      )
  );
};

export default React.memo(Calendar);

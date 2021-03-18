import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import AuthModal from '../../components/modals/AuthModal/AuthModal';
import UsersSelect from '../../components/UsersSelect/UsersSelect';
import CalendarTable from '../../components/CalendarTable/CalendarTable';
import DeleteModal from '../../components/modals/DeleteModal/DeleteModal';
import { setUserData, getUserData, deleteUserData } from '../../sessionStorageApi';
import { EVENTS, USERS } from '../../constants';
import './styles.scss';

const Calendar = () => {
  const [events, setEvents] = useState(EVENTS);
  const [currentUser, setCurrentUser] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const authorizedUser = getUserData();
    if (authorizedUser) {
      setCurrentUser(authorizedUser);
    }
  }, []);

  const confirmAuth = (user) => {
    setCurrentUser(user);
    setUserData(user);
  };

  const logOut = () => {
    setCurrentUser(null);
    setFilter('');
    deleteUserData();
  };

  const filterUsers = (e) => {
    const filterValue = e.target.value;

    if (filterValue === 'All members') {
      setFilter('');
    } else {
      setFilter(filterValue);
    }
  };

  const showDeleteModal = (event) => {
    setEventToDelete(event);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setEventToDelete(null);
  };

  const cancelDelete = () => {
    setEventToDelete(null);
  };

  return (
    <>
      { !currentUser
        ? <AuthModal confirmAuth={confirmAuth} users={USERS} />
        : (
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
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-md-end">
                  <UsersSelect className="users-select"
                    users={USERS}
                    onChange={filterUsers}
                    hasDefaultOption
                  />
                  {currentUser.isAdmin && (
                    <Button className="new-event-button btn-light"
                      variant="outline-secondary"
                      role="button"
                    >
                      New event +
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            <CalendarTable events={events}
              filter={filter}
              onDeleteEvent={showDeleteModal}
              currentUser={currentUser}
            />
          </Container>
        )}
      { eventToDelete && <DeleteModal event={eventToDelete} deleteEvent={deleteEvent} cancelDelete={cancelDelete} />}
    </>
  );
};

export default Calendar;

import React, { useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UsersSelect from '../../components/UsersSelect/UsersSelect';
import CalendarTable from '../../components/CalendarTable/CalendarTable';
import DeleteModal from '../../components/modals/DeleteModal/DeleteModal';
import UserContext from '../../UserContext';
import { HOMEPAGE } from '../../constants';
import './styles.scss';

const Calendar = ({
  users,
  events,
  eventToDelete,
  showDeleteModal,
  deleteEvent,
  cancelDelete,
  logOut,
  filterUsers,
  filter,
}) => {
  const [currentUser] = useContext(UserContext);

  return (
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
          <Col xs={12} md={6}>
            <div className="d-flex justify-content-md-end">
              <UsersSelect
                className="users-select"
                users={users}
                onChange={filterUsers}
                value={filter}
                hasDefaultOption
              />
              {currentUser.admin && (
              <Link to={`/${HOMEPAGE}/create-event`}>
                <Button className="new-event-button btn-light"
                  variant="outline-secondary"
                  role="button"
                >
                  New event +
                </Button>
              </Link>
              )}
            </div>
          </Col>
        </Row>
        <CalendarTable
          events={events}
          onDeleteEvent={showDeleteModal}
        />
      </Container>
      { eventToDelete && <DeleteModal event={eventToDelete} deleteEvent={deleteEvent} cancelDelete={cancelDelete} />}
    </>
  );
};

export default React.memo(Calendar);

import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { addEvent } from '../../store/events/actions';
import UsersSelect from '../../components/UsersSelect';
import ValidationAlert from '../../components/ValidationAlert';
import { DAYS, TIMESLOTS } from '../../constants';
import './styles.scss';

const CreateEvent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);
  const [eventData, setEventData] = useState({
    name: '',
    participants: [],
    day: DAYS[0],
    time: TIMESLOTS[0],
  });
  const [isAlertShown, setIsAlertShown] = useState(false);
  const history = useHistory();

  const isExistingEvent = (allEvents, day, time) => (
    allEvents && allEvents.find((event) => event.day === day && event.time === time)
  );

  const submitForm = (e) => {
    e.preventDefault();

    if (!isExistingEvent(events, eventData.day, eventData.time)) {
      dispatch(addEvent(eventData));
      history.push('/calendar');
    } else {
      setIsAlertShown(true);
    }
  };

  const onFieldChange = useCallback((e) => {
    setIsAlertShown(false);
    setEventData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onAlertDismiss = useCallback(() => {
    setIsAlertShown(false);
  }, []);

  return (
    currentUser
      ? (
        <>
          <Container className="create-event-form py-5 px-3">
            {isAlertShown && <ValidationAlert onAlertDismiss={onAlertDismiss} />}
            <Form onSubmit={submitForm}>
              <Form.Group as={Row} className="mb-3" controlId="formGridText">
                <Form.Label column sm="4" md="3">Name of the event:</Form.Label>
                <Col sm="8" md="5">
                  <Form.Control
                    type="text"
                    name="name"
                    value={eventData.name}
                    onChange={onFieldChange}
                    required
                    maxLength="50"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4" md="3">Participants:</Form.Label>
                <Col sm="8" md="5">
                  <UsersSelect name="participants" users={users} multiple onChange={onFieldChange} required />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4" md="3">Day:</Form.Label>
                <Col sm="8" md="5">
                  <Form.Control as="select" name="day" value={eventData.day} onChange={onFieldChange} custom>
                    {DAYS.map((day) => <option key={day} value={day}>{day}</option>)}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-5">
                <Form.Label column sm="4" md="3">Time:</Form.Label>
                <Col sm="8" md="5">
                  <Form.Control as="select" name="time" value={eventData.time} onChange={onFieldChange} custom>
                    {TIMESLOTS.map((timeslot) => <option key={timeslot} value={timeslot}>{timeslot}</option>)}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col xs="6" sm={{ span: 4, offset: 4 }} md={{ span: 2, offset: 8 }}>
                  <Link to="/calendar">
                    <Button type="button" className="button btn-outline-secondary me-2" variant="light">
                      Cancel
                    </Button>
                  </Link>
                </Col>
                <Col xs="6" sm="4" md="2">
                  <Button
                    type="submit"
                    className="button btn-outline-secondary"
                    variant="light"
                    disabled={loading}
                  >
                    Create
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </>
      )
      : <Redirect to="/calendar" />
  );
};

export default React.memo(CreateEvent);

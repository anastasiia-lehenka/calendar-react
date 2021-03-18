import React from 'react';
import Button from 'react-bootstrap/Button';
import './styles.scss';

const Event = ({ onDeleteEvent, eventData, currentUser }) => (
  <div className="event">
    <span className="event__name d-inline-block">{eventData.name}</span>
    {/* eslint-disable-next-line operator-linebreak */}
    {currentUser.isAdmin &&
      <Button className="event__delete-button" variant="transparent" onClick={() => onDeleteEvent(eventData)} />}
  </div>
);

export default Event;

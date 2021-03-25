import React from 'react';
import Button from 'react-bootstrap/Button';
import { X } from 'react-bootstrap-icons';
import './styles.scss';

const Event = ({ showDeleteModal, eventData, currentUser }) => (
  <div className="event">
    <span className="event__name">{eventData.name}</span>
    { currentUser.admin && (
    <Button className="event__delete-button" variant="transparent" onClick={() => showDeleteModal(eventData)}>
      <X className="icon" />
    </Button>
    )}
  </div>
);

export default React.memo(Event);

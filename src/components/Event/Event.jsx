import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { X } from 'react-bootstrap-icons';
import UserContext from '../../UserContext';
import './styles.scss';

const Event = ({ onDeleteEvent, eventData }) => {
  const [currentUser] = useContext(UserContext);

  return (
    <div className="event">
      <span className="event__name">{eventData.name}</span>
      { currentUser.admin && (
        <Button className="event__delete-button" variant="transparent" onClick={() => onDeleteEvent(eventData)}>
          <X className="icon" />
        </Button>
      )}
    </div>
  );
};

export default React.memo(Event);

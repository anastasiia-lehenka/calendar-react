import React from 'react';
import { Alert } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import './styles.scss';

const ValidationAlert = ({ onAlertDismiss }) => (
  <Alert className="alert mb-5" variant="danger" dismissible onClose={onAlertDismiss}>
    <XCircleFill className="alert__cross-icon" />
    <span>Failed to create an event. Time slot is already booked.</span>
  </Alert>
);

export default React.memo(ValidationAlert);

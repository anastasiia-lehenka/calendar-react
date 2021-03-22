import React, { useState } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { notificationTypes } from '../../constants';
import './styles.scss';

const Notification = ({ data }) => {
  const [show, setShow] = useState(true);

  // eslint-disable-next-line consistent-return
  const renderIcon = (type) => {
    if (type === notificationTypes.success) {
      return <CheckCircleFill color="green" />;
    }
    if (type === notificationTypes.error) {
      return <XCircleFill color="red" />;
    }
  };

  return (
    <Row>
      <Col sm={{ span: 6, offset: 6 }} md={{ span: 4, offset: 8 }}>
        <Toast className="toast" show={show} onClose={() => setShow(false)} delay={3000} autohide>
          <Toast.Header>
            { renderIcon(data.type) }
            <strong className="toast__type mr-auto">{data.type.toUpperCase()}</strong>
          </Toast.Header>
          <Toast.Body>{data.text}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default React.memo(Notification);

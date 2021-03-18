import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UsersSelect from '../../UsersSelect/UsersSelect';

const AuthModal = ({ users, confirmAuth }) => {
  const [chosenUser, setChosenUser] = useState(users[0]);

  const onSelectChange = (e) => {
    const selectedName = e.target.value;
    const selectedUser = users.find((user) => user.name === selectedName);

    setChosenUser(selectedUser);
  };

  return (
    <Modal className="auth-modal fade"
      show
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>Authorization</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Please authorise</p>
        <UsersSelect className="auth-modal__select" onChange={onSelectChange} users={users} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => confirmAuth(chosenUser)}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;

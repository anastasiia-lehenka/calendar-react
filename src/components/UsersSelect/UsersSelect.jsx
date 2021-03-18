import React from 'react';
import { Form } from 'react-bootstrap';

const UsersSelect = ({
  users,
  hasDefaultOption,
  // eslint-disable-next-line no-unused-vars
  isMultiple,
  onChange,
  className,
}) => (
  <Form.Control as="select" className={className} custom onChange={onChange}>
    { hasDefaultOption && <option value="All members">All members</option> }
    { users.map((user) => <option key={user.name} value={user.name}>{user.name}</option>) }
  </Form.Control>
);

export default UsersSelect;

import React from 'react';
import { Form } from 'react-bootstrap';

const UsersSelect = ({
  name,
  users,
  hasDefaultOption,
  multiple,
  onChange,
  className,
  required,
  value,
}) => (
  <>
    <Form.Control
      as="select"
      custom
      aria-describedby="selectHelpBlock"
      className={className}
      onChange={onChange}
      multiple={multiple}
      required={required}
      value={value}
      name={name}
    >
      { hasDefaultOption && <option value="All members">All members</option>}
      { users && users.map((user) => <option key={user.name} value={user.name}>{user.name}</option>)}
    </Form.Control>
    { multiple && (
      <Form.Text id="selectHelpBlock" muted>
        Press Ctrl to choose multiple participants.
      </Form.Text>
    )}
  </>
);

export default React.memo(UsersSelect);

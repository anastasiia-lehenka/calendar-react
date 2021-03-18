import React from 'react';
import Table from 'react-bootstrap/Table';
import { DAYS, TIMESLOTS } from '../../constants';
import Event from '../Event/Event';
import './styles.scss';

const CalendarTable = ({
  events,
  filter,
  onDeleteEvent,
  currentUser,
}) => {
  const hasEvent = (day, time) => {
    if (filter) {
      return events.find((userEvent) => (
        userEvent.day === day && userEvent.time === time && userEvent.participants.includes(filter)
      ));
    }
    return events.find((userEvent) => userEvent.day === day && userEvent.time === time);
  };

  return (
    <Table className="calendar-table" bordered>
      <thead className="calendar-table__header">
        <tr className="calendar-table__row">
          <th className="calendar-table__cell calendar-table__cell--heading">Name</th>
          {DAYS.map((day) => (
            <th className="calendar-table__cell calendar-table__cell--heading" key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TIMESLOTS.map((timeslot) => (
          <tr className="calendar-table__row" key={timeslot}>
            <th className="calendar-table__cell calendar-table__cell--heading" key={timeslot}>{timeslot}</th>
            {DAYS.map((day) => (
              <td className={
                  hasEvent(day, timeslot)
                    ? 'calendar-table__cell calendar-table__cell--event'
                    : 'calendar-table__cell'
              }
                key={day}
              >
                { hasEvent(day, timeslot) && (
                <Event eventData={hasEvent(day, timeslot)}
                  onDeleteEvent={onDeleteEvent}
                  currentUser={currentUser}
                />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CalendarTable;

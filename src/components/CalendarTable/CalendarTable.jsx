import React, { useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Event from '../Event/Event';
import { DAYS, TIMESLOTS } from '../../constants';
import './styles.scss';

const CalendarTable = ({
  currentUser,
  events,
  showDeleteModal,
}) => {
  const getEvent = useCallback((allEvents, day, time) => (
    allEvents && allEvents.find((userEvent) => userEvent.day === day && userEvent.time === time)
  ), []);

  return (
    <Table className="calendar-table" bordered>
      <thead className="calendar-table__header">
        <tr className="calendar-table__row">
          <th className="calendar-table__cell calendar-table__cell--heading">Name</th>
          { DAYS.map((day) => (
            <th className="calendar-table__cell calendar-table__cell--heading" key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { TIMESLOTS.map((timeslot) => (
          <tr className="calendar-table__row" key={timeslot}>
            <th className="calendar-table__cell calendar-table__cell--heading" key={timeslot}>{timeslot}</th>
            { DAYS.map((day) => (
              <td className={
                  getEvent(events, day, timeslot)
                    ? 'calendar-table__cell calendar-table__cell--event'
                    : 'calendar-table__cell'
                }
                key={day}
              >
                { getEvent(events, day, timeslot) && (
                  <Event
                    showDeleteModal={showDeleteModal}
                    currentUser={currentUser}
                    eventData={getEvent(events, day, timeslot)}
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

export default React.memo(CalendarTable);

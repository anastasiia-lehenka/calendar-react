import { v4 as uuidv4 } from 'uuid';
import service from './Service';
import { notificationTypes } from '../constants';

class NotificationsDecorator {
  constructor(serviceInstance) {
    this.service = serviceInstance;
  }

  async getUsers() {
    const response = {};

    try {
      response.data = await this.service.getUsers();
      response.notification = { id: uuidv4(), type: notificationTypes.success, text: 'Users loaded' };
    } catch (err) {
      response.notification = { id: uuidv4(), type: notificationTypes.error, text: `Failed loading users. ${err}` };
    }

    return response;
  }

  async getEvents() {
    const response = {};
    try {
      response.data = await this.service.getEvents();
      response.notification = { id: uuidv4(), type: notificationTypes.success, text: 'Events loaded' };
    } catch (err) {
      response.notification = { id: uuidv4(), type: notificationTypes.error, text: `Failed loading events. ${err}` };
    }

    return response;
  }

  async deleteEvent(eventId) {
    const response = {};

    try {
      await this.service.deleteEvent(eventId);
      response.data = true;
      response.notification = { id: uuidv4(), type: notificationTypes.success, text: 'Event deleted' };
    } catch (err) {
      response.data = false;
      response.notification = { id: uuidv4(), type: notificationTypes.error, text: `Failed to delete event. ${err}` };
    }

    return response;
  }

  async createEvent(event) {
    const response = {};

    try {
      response.data = await this.service.createEvent(event);
      response.notification = { id: uuidv4(), type: notificationTypes.success, text: 'Event created' };
    } catch (err) {
      response.notification = { id: uuidv4(), type: notificationTypes.error, text: `Failed creating event. ${err}` };
    }

    return response;
  }
}

export default new NotificationsDecorator(service);

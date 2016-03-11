/*eslint no-underscore-dangle: 0*/
'use strict';

var beans = require('simple-configure').get('beans');
var RegistrationReadModel = beans.get('RegistrationReadModel');


function RegistrationWriteModel(eventStore) {
  this.eventStore = eventStore;
  this.registrationReadModel = new RegistrationReadModel(eventStore);
}

RegistrationWriteModel.prototype.alreadyHasReservation = function (sessionId) {
  return !!this.registrationReadModel.reservationsBySessionId()[sessionId];
};

RegistrationWriteModel.prototype.alreadyHasWaitinglistReservation = function (sessionId) {
  return !!this.registrationReadModel.waitinglistReservationsBySessionId()[sessionId];
};

// internal function?
RegistrationWriteModel.prototype.participantEventFor = function (memberId) {
  return this.registrationReadModel.participantEventFor(memberId);
};

RegistrationWriteModel.prototype.isAlreadyRegistered = function (memberId) {
  return this.registrationReadModel.isAlreadyRegistered(memberId);
};

RegistrationWriteModel.prototype.waitinglistParticipantEventFor = function (memberId) {
  return this.registrationReadModel.waitinglistParticipantEventFor(memberId);
};

RegistrationWriteModel.prototype.registeredInRoomType = function (memberID) {
  var participantEvent = this.participantEventFor(memberID);
  if (participantEvent) {
    return participantEvent.roomType;
  }
  return null;
};

RegistrationWriteModel.prototype.isAlreadyOnWaitinglist = function (memberId) {
  return !!this.waitinglistParticipantEventFor(memberId);
};

/////////////////////////////////////////////////////////////////////////////////////////
RegistrationWriteModel.prototype.updateRegistrationEvents = function (newEvents) {
  this.eventStore.updateRegistrationEvents(newEvents);
};

RegistrationWriteModel.prototype.isFull = function (roomType) {
  return this.registrationReadModel.isFull(roomType);
}

module.exports = RegistrationWriteModel;

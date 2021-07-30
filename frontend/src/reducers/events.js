import { combineReducers } from "redux";

const _ = require("lodash");

// const removeParticipant = (user, event, events) => {
//   console.log(events);
//   console.log(event);
//   let eventIndex = events.findIndex((element) => {
//     return _.isEqual(element, event);
//   });
//   console.log(eventIndex);
//   if (JSON.stringify(event.participants).includes(JSON.stringify(user))) {
//     let participantIndex = event.participants.findIndex((element) => {
//       return _.isEqual(element, user);
//     });
//     event.participants.splice(participantIndex, 1);
//   }
//   if (eventIndex !== -1) {
//     events[eventIndex] = event;
//   } else {
//     console.log("Removal Error");
//   }

// };

const eventsReducer = (events = [], action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return events;
    case "GET_EVENTS":
      return action.payload;
    default:
      return events;
  }
};

const eventReducer = (event = {}, action) => {
  switch (action.type) {
    case "PARTICIPANT_JOIN":
//     case "PARTICIPANT_LEAVE":
//       event = { ...action.event};
//       if (
//         JSON.stringify(event.participants).includes(
//           JSON.stringify(action.user)
//         )
//       ) {
//         let participantIndex = event.participants.findIndex((element) => {
//           return _.isEqual(element, action.user);
//         });
//         event.participants.splice(participantIndex, 1);
//       }
//       return event;
      return event;
    case "GET_EVENT":
      return action.payload;
    case "ADD_COMMENT":
      return event;
    default:
      return event;
  }
};

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
});

import React from "react";

const GlobalContext = React.createContext({
	monthIndex: 0,
	setMonthIndex: (index) => {},
	showEventModal: false,
	setShowEventModal: () => {},
	dispatchCalEvent: ({ type, payload }) => {},
	savedEvents: [],
	selectedEvent: null,
	setSelectedEvent: () => {},
	setLabels: () => {},
	labels: [],
	updateLabel: () => {},
	filteredEvents: [],
	savedCalendars: [],
	setSavedCalendars: () => {},
	events: [],
	setEvents: () => {},
	showSettingModal: false,
	setShowSettingModal: () => {},
	notificationSetting: false,
	setNotificationSetting: () => {},
});

export default GlobalContext;

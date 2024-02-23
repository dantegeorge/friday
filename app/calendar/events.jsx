const fetchCalendarEvents = async ({ session }) => {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
        calendarId: "primary",
      },
    }
  );
  const eventsData = await response.json();
  return eventsData.items;
};

export default fetchCalendarEvents();

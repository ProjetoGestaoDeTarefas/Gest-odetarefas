import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '1049313708260-d1u49e8j5ogl1uglhiiq0bqus9liq34c.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDscTf8DLcOL0yLa03EQpFNxAePnayOJq4';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const GoogleCalendar = () => {
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                scope: SCOPES,
            });
        };

        gapi.load('client:auth2', start);
    }, []);

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            listUpcomingEvents();
        });
    };

    const listUpcomingEvents = () => {
        gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        }).then(response => {
            const events = response.result.items;
            console.log('Upcoming events:', events);
        });
    };

    return (
        <div>
            <button onClick={handleAuthClick}>Authorize and Load Calendar Events</button>
        </div>
    );
};

export default GoogleCalendar;

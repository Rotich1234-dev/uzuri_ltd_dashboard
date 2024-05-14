
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Initialize moment localizer
const localizer = momentLocalizer(moment);

// Sample events data
const events = [
  {
    id: 1,
    title: 'Meeting to dispatch construction items',
    start: new Date(2024, 1, 14, 10, 0), // year, month (0-based), day, hour, minute
    end: new Date(2024, 1, 14, 12, 0),
  },
  {
    id: 2,
    title: 'Event to address customer sales',
    start: new Date(2024, 1, 15, 13, 0),
    end: new Date(2024, 1, 15, 15, 0),
  },
];

const MyCalendar = () => {
  return (
    <div style={{ height: '500px' }}>
        <h1 className='text-2xl text-blue font-bold'> UZURI LIMITED KALENDA </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ flex: 1 }}

      />
      
    </div>
  );
};

export default MyCalendar;

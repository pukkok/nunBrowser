import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'

const Calendar = ({calenderSize=1000, work, handleDateClick, handleEventClick, myCustomButton}) => {

    const calenderStyle = {
        width : calenderSize+'px'
    }

    return(
        <div className="calender" style={calenderStyle}>
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin ]}
            initialView="dayGridMonth"
            editable={true}
            weekends={false} // 주말 필요 x
            events={work}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            customButtons={myCustomButton}
            locale={'ko'}
            headerToolbar = {
                { 
                    left: 'prev,next today',
                    center: 'title',
                    right:'myCustomButton',   
                }
            }

            />
        </div>
    )
}

export default Calendar
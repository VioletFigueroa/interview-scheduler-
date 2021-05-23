import React from "react";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import { useApplicationData } from "helpers/useApplicationData";

import "components/Application.scss";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
    let error = null;

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          error={error}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
    //   
// export default function Application(props) {
//
//   const schedule = getAppointmentsForDay(state, state.day).map(
//     (appointment) => {
//       const interview = getInterview(state, appointment.interview);
//       const interviewers = getInterviewersForDay(state, state.day);
//       return (
//         <Appointment
//           key={appointment.id}
//           id={appointment.id}
//           time={appointment.time}
//           interview={interview}
//           interviewers={interviewers}
//           bookInterview={bookInterview}
//           cancelInterview={cancelInterview}
//           
//         />
//       );
//     }
//   );
//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} day={state.day} setDay={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {schedule}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }

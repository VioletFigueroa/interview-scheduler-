import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      // 0: [
      //   {
      //     id: 1,
      //     time: "12pm",
      //   },
      //   {
      //     id: 2,
      //     time: "1pm",
      //     interview: {
      //       student: "Lydia Miller-Jones",
      //       interviewer: {
      //         id: 1,
      //         name: "Sylvia Palmer",
      //         avatar: "https://i.imgur.com/LpaY82x.png",
      //       },
      //     },
      //   },
      //   {
      //     id: 3,
      //     time: "2pm",
      //   },
      //   {
      //     id: 4,
      //     time: "3pm",
      //     interview: {
      //       student: "Archie Cohen",
      //       interviewer: {
      //         id: 2,
      //         name: "Tori Malcolm",
      //         avatar: "https://i.imgur.com/Nmx0Qxo.png",
      //       },
      //     },
      //   },
      //   {
      //     id: 5,
      //     time: "4pm",
      //     interview: {
      //       student: "Maria Boucher",
      //       interviewer: {
      //         id: 3,
      //         name: "Mildred Nazir",
      //         avatar: "https://i.imgur.com/T2WwVfS.png",
      //       },
      //     },
      //   },
      // ],
    },
  });
  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    const api = '/api/'
    const daysURL = "days";
    const appointmentsURL = api + "appointments";
    // const interviewersURL = api + "interviewers";
    Promise.all([axios.get(daysURL), axios.get(appointmentsURL)])
      .then((res) => {
        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => <Appointment key={appointment.id} {...appointment} />
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
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

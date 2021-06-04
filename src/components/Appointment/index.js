import React from "react";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";

import Empty from "./Empty";

import Show from "./Show";

import Form from "./Form";

import Status from "./Status";

import Confirm from "./Confirm";

import Error from "./Error";

const EMPTY = "EMPTY";

const SHOW = "SHOW";

const CREATE = "CREATE";

const SAVING = "SAVING";

const DELETING = "DELETEING";

const CONFIRM = "CONFIRM";

const EDIT = "EDIT";

const ERROR_SAVE = "ERROR_SAVE";

const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview, props.day)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const destroy = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id, props.day)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not book appointment." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={back} />
      )}
    </article>
  );
}

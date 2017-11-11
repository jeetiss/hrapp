import React from 'react'
import styled from 'react-emotion'
import { parse } from 'qs'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { createVacancy, editVacancy } from '../redux'
import { toArray } from '../../../store/utils'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  padding-bottom: 20px;
`

const Error = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  color: red;
  font-family: Arial;
  font-size: 14px;
  padding: 5px 0;
`

const Label = styled.div`
  font-family: Arial;
  font-size: 14px;
  padding: 5px 0;
`

const validate = values => {
  const selected = document.querySelectorAll('#assignees option:checked')
  const assignees = Array.from(selected).map(el => el.value).filter(Boolean)
  const errors = {}

  if (!assignees.length) {
    errors.assignees = 'заполните поле'
  }

  if (!values.title) {
    errors.title = 'заполните поле'
  }

  if (!values.description) {
    errors.description = 'заполните поле'
  }

  return errors
}

const VacancyForm = ({ users, vacancy, createVacancy, editVacancy }) => (
  <Formik
    validate={validate}
    initialValues={vacancy}
    onSubmit={(values, formApi) => {
      const selected = document.querySelectorAll('#assignees option:checked')
      const assignees = Array.from(selected)
        .map(el => Number.parseFloat(el.value))
        .filter(Boolean)

      vacancy.id
        ? editVacancy({
          body: { ...values, assignees },
          params: { id: vacancy.id }
        })
        : createVacancy({ body: { ...values, assignees } })
    }}
  >
    {props => (
      <Form onSubmit={props.handleSubmit}>
        <Field>
          <Label>
            Название:
          </Label>

          <input
            type='text'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.title}
            name='title'
          />

          {props.errors.title && <Error>{props.errors.title}</Error>}
        </Field>

        <Field>
          <Label>
            Описание:
          </Label>

          <textarea
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.description}
            name='description'
          />

          {props.errors.description &&
            <Error>{props.errors.description}</Error>}
        </Field>

        <Field>
          <Label>
            Ответственный:
          </Label>

          <select
            type='text'
            size='6'
            multiple
            defaultValue={vacancy.assignees}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            id='assignees'
          >
            <option />
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {props.errors.assignees && <Error>{props.errors.assignees}</Error>}
        </Field>

        <button type='submit' disabled={props.isSubmitting}>Submit</button>
      </Form>
    )}
  </Formik>
)

const mapActionsToProps = {
  createVacancy,
  editVacancy
}

const mapStateToProps = ({
  entities: { users, vacancies },
  router: { location }
}) => {
  const id = Number.parseFloat(location.pathname.split('/')[2])
  const { assignee: assignedUser } = location.search
    ? parse(location.search, { ignoreQueryPrefix: true })
    : { assignee: null }

  return {
    users: toArray(users),
    vacancy: id ? vacancies[id] : { assignees: [assignedUser].filter(Boolean) }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(VacancyForm)

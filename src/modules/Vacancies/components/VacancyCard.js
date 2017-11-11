import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'

const Container = styled.div`
  margin: 20px;
  padding: 20px;

  background-color: #e7e7e7;

  width: 260px;
  height: 200px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-family: Arial;
  font-size: 18px;
  font-weight: 600;
  color: #000;
`

const Description = styled.div`
  font-family: Arial;
  font-size: 14px;
  color: #000;
`

const link = css`
  text-decoration: none;
`

const Vacancy = ({ id, title, description }) => (
  <Link className={link} key={id} to={`/vacancies/${id}`}>
    <Container>
      <Title>{title}</Title>

      <Description>{description}</Description>
    </Container>
  </Link>
)

export default Vacancy

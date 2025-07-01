import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;

  span:last-of-type {
    min-width: 4.375rem
  }
`

const BaseInput = styled.input`
  background-color: transparent;
  color: ${props => props.theme['gray-500']};
  border: none;
  border-bottom: 2px solid ${props => props.theme['gray-500']};
  padding: 0 0.5rem 0.5rem;
  font-size: inherit;
  font-weight: bold;

  &:read-only {
    cursor: not-allowed;
  }

  &:read-only,
  &:focus,
  &:valid {
    color: ${props => props.theme['gray-300']};
    border-color: ${props => props.theme['green-300']};
    box-shadow: none;
  }

  &::placeholder {
    color: ${props => props.theme['gray-500']}
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  text-align: center;
  width: 4.5rem;

  /* disable native arrow for type=number */
  /* -moz-appearance: textfield; */

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

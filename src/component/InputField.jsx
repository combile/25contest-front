import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 30px;

  label {
    font-size: 14px;
    color: #B7BBC5;
    display: block;
    margin-bottom: 6px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 12px 6px 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1.5px solid
    ${props => props.$isValid === true
      ? '#34C759'
      : props.$isValid === false
      ? '#FF3B30'
      : '#B7BBC5'};
  outline: none;
  border-radius: 0;

  &::placeholder {
    color: #C0C0C0;
  }

  &:focus {
    border-bottom: 1.5px solid #336AF8;
  }
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: -15px;
  height: 16px;
  color: ${props => props.type === 'error' ? '#FF3B30' : '#34C759'};
`;

const InputField = ({ label, value, onChange, type = 'text', isValid, errorMessage, successMessage, Icon, placeholder }) => (
  <Wrapper>
    <label>{label}</label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      $isValid={isValid}
      placeholder={placeholder}
    />
    {errorMessage && <Message type="error"><Icon width={14} height={14} />{errorMessage}</Message>}
    {!errorMessage && isValid && successMessage && <Message type="success"><Icon width={14} height={14} />{successMessage}</Message>}
  </Wrapper>
);

export default InputField;
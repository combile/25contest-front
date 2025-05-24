import styled from 'styled-components';

const ConfirmButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  background-color: ${props => props.disabled ? '#B7BBC5' : '#336AF8'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.3s ease;
`;

export default ConfirmButton;

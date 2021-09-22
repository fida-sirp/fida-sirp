import styled from 'styled-components';

export const TextInputWrapper = styled.div`
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  justify-content: center;
  flex-direction: column;
`;

export const TextInputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  background: #1c1c24;
  border-radius: 5px;
  height: ${props => (props.height ? props.height === 'auto' : '140px')};
`;

export const TextArea = styled.textarea`
  font-size: 15px;
  width: 100%;
  outline: none;
  text-align: left;
  color: white;
  border-radius: 5px;
  padding: 11px 11px;
  background: border-box;
  border: 1px solid #ffffff5c;
  resize: none;
  input:-webkit-autofill {
    color: #2a2a2a !important;
  }
  ::placeholder {
    font-size: 15px;
  }
  &:focus {
    border: 1px solid #33c758;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid green;
    -webkit-text-fill-color: green;
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
export const ErrorDiv = styled.p`
  color: #fc5a5a;
  font-size: 13px;
  font-weight: 700;
  margin-left: 3px;
  margin-top: -20px;
  text-align: left;

  @media (max-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 300px) {
    max-width: 122px;
  }
`;

export const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  margin-bottom: 15px;
`;

export const OuterWrongImage = styled.img`
  width: 20px;
  display: flex;
  position: absolute;
  top: 10px;
  right: -30px;
`;

export const OuterRightImage = styled.img`
  width: 15px;
  display: flex;
  position: absolute;
  top: 10px;
  right: -30px;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

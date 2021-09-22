import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export const TextInputWrapper = styled.div`
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: auto;
  display: flex;
  align-items: center;
  margin-bottom: ${props => (props.noMargin ? '0px' : '24px')};
  justify-content: center;
  flex-direction: column;
`;

export const TextInputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 38px;
  justify-content: center;
  background: #1c1c24;
  border-radius: 5px;
`;

export const TextInput = styled.input`
  font-size: 15px;
  width: 100%;
  outline: none;
  text-align: left;
  color: #ffffff;
  border-radius: 5px;
  padding: 0px 11px;
  background: border-box;
  border: 1px solid #ffffff5c;
 
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
    border: 1px solid green !important;
    -webkit-text-fill-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s !important;
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

export const EyeIcon = styled(EyeOutlined)`
  width: 20px;
  font-size: 17px;
  height: 20px;
  display: flex;
  color: #ffffff;
  position: absolute;
  top: 11px;
  right: 11px;
  cursor: pointer;
`;

export const EyeSlashIcon = styled(EyeInvisibleOutlined)`
  width: 20px;
  font-size: 17px;
  height: 20px;
  display: flex;
  color: #ffffff;
  position: absolute;
  top: 11px;
  right: 11px;
  cursor: pointer;
`;

export const OuterWrongImage = styled.img`
  width: 20px;
  height: auto;
  display: flex;
  position: absolute;
  top: 10px;
  right: -30px;
`;

export const OuterRightImage = styled.img`
  width: 15px;
  height: auto;
  display: flex;
  position: absolute;
  top: 10px;
  right: -30px;
`;

export const CloseDynamicField = styled.div`
  width: 43px;
  height: 38px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  top: 0px;
  right: -44px;
  text-align: center;
  margin: auto;
  justify-content: center;
  display: flex;
  align-items: center;
  background: #1c1c24;
  border-radius: 5px;
  color: #ffffff5c;
  border: 1px solid #ffffff5c;
  cursor:pointer;
  :hover{
    color: #fff;
  }
}
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

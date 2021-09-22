import React, { useState } from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const LoaderWrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
`;

const SPToggleSwitch = ({ onChecked, onChange, toggleId, disabled}) => {
  const [getToggleSwitch, setToggleSwitch] = useState(onChecked);

  const handleToggleSwitch = () => {
    setToggleSwitch(!getToggleSwitch);
  };
  return (
    <Switch
      checked={onChecked}
      onChange={onChange}
      disabled={disabled}
      onColor="#224731"
      onHandleColor="#33C758"
      handleDiameter={23}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={19}
      width={36}
      className="react-switch"
      id={toggleId}
    />
  );
};

export default SPToggleSwitch;

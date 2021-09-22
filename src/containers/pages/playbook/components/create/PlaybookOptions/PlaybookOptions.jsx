/* eslint-disable */
///import { Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import Button from '../../../../../../components/SPButton';

import './styles.css';

const PlaybookOptions = props => {
 
  return (
    <div className="playbook-container">
      <div className="playbook-options">
        <span className="create-playbook-txt">
          {props.playbookName ? props.playbookName : 'New Playbook'}
        </span>
        {/* {!props.viewMode ? (
          <img
            onClick={props.handlePlaybook}
            className="create-playbook-img"
            alt="create-playbook"
            src="/images/create-playbook/create.svg"
          ></img>
        ) : null} */}
      </div>
      {!props.viewMode ? (
        <div className="container-rigth">
          <div className="playbook-options">
            <Button
              onButtonClick={props.handleSavePlaybook}
              type="button"
              title="Save Changes"
            >
              Save Changes
            </Button>
          </div>
          <div className="playbook-options" onClick={props.handlePlaybook}>
            <img
              className="playbook-setting-img"
              alt="create-playbook"
              src="/images/create-playbook/setting.svg"
            ></img>
            <span className="playbook-setting-txt">Playbook Settings</span>
          </div>
          </div>
      ) : null}
    </div>
  );
};

export default PlaybookOptions;

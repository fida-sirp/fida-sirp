import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import { setFeedbackAction } from './../../actions/apps';

const AlertBox = styled(Alert)`
  display: flex;
  width: 700px;
  margin: 0px auto;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 55px;
  text-align: center;

  .ant-alert {
    position: fixed;
    right: 0px;
    z-index: 1000000000;
  }
`;

const SPAlertBox = ({ appStore, setFeedbackAction, onClose }) => {
  const [feedbackMessage, setfeedbackMessage] = React.useState('');
  const [feedbackType, setfeedbackType] = React.useState('');
  const [module, setmodule] = React.useState('');

  useEffect(() => {
    setfeedbackMessage(appStore.feedbackMessage);
    setfeedbackType(appStore.feedbackType);
    setmodule(appStore.module);
  }, [appStore]);

  if (
    feedbackMessage &&
    feedbackMessage !== '' &&
    feedbackType &&
    feedbackType !== ''
  ) {
    return (
      <div className="common-alert">
        <AlertBox
          message={feedbackMessage}
          type={feedbackType}
          showIcon
          closable
          onClose={() => {
            onClose && onClose();
            setFeedbackAction({
              feedbackMessage: '',
              feedbackType: '',
            });
          }}
        />
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    appStore: state.appStore,
  };
};

const mapDispatchToProps = {
  setFeedbackAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SPAlertBox);

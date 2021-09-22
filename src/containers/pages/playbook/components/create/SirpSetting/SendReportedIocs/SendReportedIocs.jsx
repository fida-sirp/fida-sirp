import React from 'react';
import InputBox from '../../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../../components/TextAreaBox';

const SendReportedIocs = props => {
  return (
    <>
      <div style={{ marginTop: '25px' }}>
      <span className="input-label">Email</span>
        <InputBox
          onInputChange={props.handleEmailChange}
          value={
            props.selectedNode.email !== ''
              ? props.selectedNode.email
              : props.email
          }
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          // label="Email"
          width="260"
        />
      </div>
      <div style={{ marginTop: '25px' }}>
      <span className="input-label">Subject</span>
        <InputBox
          onInputChange={props.handleSubjectChange}
          value={
            props.selectedNode[`subject_${props.sirpKey}`] !== ''
              ? props.selectedNode[`subject_${props.sirpKey}`]
              : props.subject
          }
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          width="260"
        />
      </div>

      <div style={{ marginTop: '25px' }}>
      <span className="input-label">Message</span>
        <TextAreaBox
          onInputChange={props.handleMessageChange}
          value={
            props.selectedNode[`message_${props.sirpKey}`] !== ''
              ? props.selectedNode[`message_${props.sirpKey}`]
              : props.message
          }
          type="text"
          id="message"
          name="message"
          placeholder="Message"
          width="280"
        />
      </div>
    </>
  );
};

export default SendReportedIocs;

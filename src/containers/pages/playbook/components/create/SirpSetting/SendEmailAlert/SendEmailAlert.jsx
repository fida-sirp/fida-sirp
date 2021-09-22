import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import InputBox from '../../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../../components/TextAreaBox';

const SendEmailAlerts = props => {
   const [emails, setEmails] = useState([]);


   useEffect(()=>{
      // console.log(props.selectedNode.emails)
       const string = props.selectedNode.emails ? props.selectedNode.emails : '';
       const emails = string.split(',');
      //  console.log(emails);
       setEmails(emails);
   }, []);

  const { Option } = Select;
  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Emails
      </div>
      <div>
        <Select
         mode="tags"
          size="middle"
          placeholder="Please select"
          defaultValue={
            emails.length !== 0 && emails[0] !== ""
              ? emails
              : props.selectedEmails
          }
          onChange={props.handleEmailSelect}
          style={{ width: '70%' }}
        >
          {props.userEmail.map((items, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Option key={items.email.toString()} value={items.email}>
                {items.email}
              </Option>
            );
          })}
        </Select>
      </div>
      <div style={{ marginTop: '25px' }}>
        <InputBox
          onInputChange={props.handleSubjectChange}
          value={props.subject}
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          label="Subject"
          width="260"
        />
      </div>

      <div style={{ marginTop: '25px' }}>
        <TextAreaBox
          onInputChange={props.handleMessageChange}
          value={props.message}
          type="text"
          id="message"
          name="message"
          placeholder="Message"
          label="Message"
          width="260"
        />
      </div>
    </>
  );
};

export default SendEmailAlerts;

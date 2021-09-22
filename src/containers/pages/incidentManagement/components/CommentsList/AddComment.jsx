import React, { useState, useEffect, useParams } from 'react';
import PropTypes from 'prop-types';
import SingleComment from '../SingleComment';
import { StyleTextArea, AddMainBox } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import { Input, Row, Col } from 'antd';
import TextEditorBox from '../../../../../components/TextEditorBox';
import SPUpload from '../../../../../components/SPUpload';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';

function AddComment({ onAddComment, postingComment }) {
  console.log({ postingComment });
  const [isFormEnable, setIsFormEnable] = useState(true);
  const [editorHtml, setEditorHtml] = useState('');
  const [file, setFile] = useState(null);
  const enableForm = () => {
    setFile(null);
    setIsFormEnable(true);
  };

  console.log({ file });
  return (
    <AddMainBox>
      {isFormEnable && (
        <>
          <TextEditorBox
            value={editorHtml}
            onChange={html => setEditorHtml(html)}
            placeholder="Add your Comment Here..."
          />
          <Row
            gutter={11}
            justify="start"
            style={{ width: '100%', paddingTop: 4, paddingBottom: 4 }}
          >
            <Col>
              {file && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: 2,
                    background: '#1C1C24',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  <a href="javascript:void(0)">{file?.name}</a>
                  <div onClick={() => setFile(null)}>
                    <CancelIcon />
                  </div>
                </div>
              )}
              <SPUpload
                id={'comment-upload'}
                label={'Upload File'}
                onInputChange={(name, file) => {
                  setFile(file);
                }}
              />
            </Col>
          </Row>
          <Row
            gutter={11}
            justify="end"
            style={{ width: '100%', paddingTop: 20, paddingBottom: 20 }}
          >
            <Col>
              <SPButton
                title="Cancel"
                size="small"
                type="secondary"
                onButtonClick={() => {
                  setEditorHtml('');
                  setIsFormEnable(false);
                }}
              />
            </Col>
            <Col>
              <SPButton
                title="Add"
                size="small"
                disabled={editorHtml? false: true}
                isLoading={postingComment}
                onButtonClick={() => {
                  if(editorHtml){
                    onAddComment(editorHtml, file, () => {
                      setIsFormEnable(false);
                      setEditorHtml('');
                      setFile(null);
                    });
                  }
                  
                }}
              />
            </Col>
          </Row>
        </>
      )}
      {!isFormEnable && (
        <Row
          gutter={11}
          justify="end"
          style={{ width: '100%', paddingTop: 20 }}
        >
          <Col>
            <SPButton
              title={'Comment'}
              size="small"
              onButtonClick={enableForm}
              isLoading={postingComment}
            />
          </Col>
        </Row>
      )}
    </AddMainBox>
  );
}

export default AddComment;

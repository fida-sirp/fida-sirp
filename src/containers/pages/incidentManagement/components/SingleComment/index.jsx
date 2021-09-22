import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledDiv,
  LabelMainDiv,
  LabelSpan,
  TimeSpan,
  MessageDiv,
} from './StyledComponents';
import SPRoundProgress from '../../../../../components/SPRoundProgress';
import { Col, Row } from 'antd';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';
import CommentsUtils from './utils/CommentsUtils';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { downloadAsset } from '../../../../../actions/incidentManagement';
import { isString } from 'formik';
import ImageLoader from '../../../../../components/ImageLoader';

function SingleComment({
  data,
  onDeleteAsset,
  canDeleteComment,
  onDeleteAttachment,
  downloadAsset,
}) {
  const [attachment, setAttachment] = React.useState();
  React.useEffect(() => {
    setAttachment();
    checkAndGetImage(data);
  }, [data?.attachment]);

  const checkAndGetImage = async data => {
    if (data?.attachment) {
      const res = await CommentsUtils.getImageFromURL(data?.attachment);
      setAttachment(res);
    }
  };

  console.log({ attachment });
  return (
    <StyledDiv>
      <Row>
        <Col md={18}>
          <div>
            <LabelMainDiv>
              <ImageLoader
                url={data?.profileImage}
                style={{
                  height: 60,
                  width: 60,
                  marginRight: 10,
                  borderRadius: '50%',
                }}
              />
              <LabelSpan>{data.name}</LabelSpan>
              <TimeSpan>added a comment on {data.time}</TimeSpan>
            </LabelMainDiv>
            <MessageDiv dangerouslySetInnerHTML={{ __html: data.message }} />
            {attachment && (
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 10000,
                    left: 131,
                    background: ' #000',
                    top: 8,
                    height: 24,
                    width: 24,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '1px 2px #e7e7e7',
                    cursor: 'pointer',
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    setAttachment();
                    onDeleteAttachment(data);
                  }}
                >
                  <CancelIcon />
                </div>
                {attachment?.isImage ? (
                  <img
                    src={attachment?.src}
                    style={{ height: 160, width: 160 }}
                  />
                ) : (
                  <div
                    style={{
                      height: 60,
                      display: 'flex',
                      alignItems: 'flex-end',
                      width: 180,
                      padding: 4,
                      border: '1px solid #e7e7e7',
                      borderRadius: 5,
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      downloadAsset({
                        url: attachment?.path,
                        name: data?.ico_attachment,
                        ext: isString(attachment?.path)
                          ? attachment?.path.split('.')?.[
                              attachment?.path.split('.').length - 1
                            ]
                          : 'zip',
                      });
                    }}
                  >
                    <a href="javascript:void(0)" onClick={() => {}}>
                      {data?.ico_attachment}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </Col>
        {canDeleteComment && (
          <Col md={6} style={{ textAlign: 'right' }}>
            <div
              onClick={e => {
                e.stopPropagation();
                onDeleteAsset(data);
              }}
            >
              <CancelIcon />
            </div>
          </Col>
        )}
      </Row>
    </StyledDiv>
  );
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  downloadAsset,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  SingleComment
);

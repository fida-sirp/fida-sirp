import React from 'react';
import PropTypes from 'prop-types';
import SingleComment from '../SingleComment';
import { StyledDiv } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import AddComment from './AddComment';
import { Input, Row, Col } from 'antd';
import { isString } from 'lodash';
import packageJson from '../../../../../../package.json';

function CommentsList({
  items,
  onAddComment,
  postingComment,
  deleteComment,
  loggedInUser,
}) {

  return (
    <StyledDiv>
      {items.map(function (item) {
        var attach_path = null;
        if (item?.attachment?.path){
          attach_path = item.attachment.path.replace(packageJson.proxy,window.location.origin).replace(":3000","")
  var profile_image_path="";
       if (item?.icoAuthor?.profileImage){
           profile_image_path = item.icoAuthor.profileImage.replace(packageJson.proxy,window.location.origin).replace(":3000","")

        }
        }
        return (
          <SingleComment
            data={{
              name:
                item?.ico_author_name !== ''
                  ? item?.ico_author_name
                  : item?.icoAuthor?.usr_name,
              time: item?.ico_created_at,
              message: item?.ico_comment,
              ico_id: item?.ico_id,
              attachment: attach_path,
              ico_attachment: item?.ico_attachment,
              profileImage: profile_image_path,
            }}
            onDeleteAsset={data => {
              deleteComment(data?.ico_id);
            }}
            onDeleteAttachment={data => {
              deleteComment(
                data?.ico_id,
                isString(data?.ico_attachment)
                  ? data?.ico_attachment.replace(',', '')
                  : data?.ico_attachment
              );
            }}
            canDeleteComment={
              String(item?.ico_author_id) === String(loggedInUser)
            }
          />
        );
      })}

      <AddComment onAddComment={onAddComment} postingComment={postingComment} />
    </StyledDiv>
  );
}

export default CommentsList;

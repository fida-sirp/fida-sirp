import React from 'react';
import PropTypes from 'prop-types';
import { map, find } from 'lodash';
import { StyledBox, TagContainer, TagWrapper } from './StyledComponents';
import SPGroupAddItemDropdown from '../../../../../components/SPGroupAddItemDropdown';
import Member from '../../../../../components/UploadedItem';
import { Colors } from '../../../../../theme';

function AddMember({ members, selectedMembers, onAdd, onRemove ,checkAccess=true}) {
  return (
    
    <StyledBox>
     {(checkAccess === true) ?
      <div style={{ width: 217, marginBottom: 10 }}>
        <SPGroupAddItemDropdown
          title="Add team members"
          mode="multiple"
          onSelect={({ key }) => onAdd(key)}
          items={members}
          group={true}
          groupList={[
            { groupName: 'Users' },
            { groupName: 'Groups' },
          ]}
        />
      </div> : ""}
      <TagWrapper>
        <TagContainer>
          { map(selectedMembers, member => {
            
            let dataObject  = find(members, function (m) {
             
              return String(m.key) === String(member);
            });
            return (
              <Member
                name={dataObject?.label}
                margin="3px 0px"
                backgroundColor="#373747"
                onRemove={() => {
                  onRemove(member);
                }}
                checkAccess={checkAccess}
              />
            );
          })}
        </TagContainer>
      </TagWrapper>
    </StyledBox>
  );
}

export default AddMember;

AddMember.propTypes = {
  members: PropTypes.array,
  selectedMembers: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  checkAccess:PropTypes.string,
};

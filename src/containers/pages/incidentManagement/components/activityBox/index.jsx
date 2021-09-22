import React from 'react';
import PropTypes from 'prop-types';
import { isArray, map } from 'lodash';

import {
  Container,
  Header,
  ActivityDiv,
  TimeStamp,
  ActivityText,
  StyledDiv,
} from './StyledComponents';

function Activity({ item }) {
  return (
    <ActivityDiv>
      <TimeStamp>
        <ActivityText> {item.user}</ActivityText>
        {` (${item.timeStamp}) `}
      </TimeStamp>
      <ActivityText fontStyle="bold">{item.title}</ActivityText>
      <ActivityText>{item.description}</ActivityText>
    </ActivityDiv>
  );
}

function ActivityBox({ activities }) {
  if (!isArray(activities)) return null;
  return (
    <div>
      <Header>Activity</Header>
      <StyledDiv>
        <Container>
          {map(activities, item => (
            <Activity
              item={{
                user: item?.aloUser?.usr_name,
                timeStamp: item.alo_created_at,
                title: item.alo_subject,
                description: item.alo_description,
              }}
            />
          ))}
        </Container>
      </StyledDiv>
    </div>
  );
}

export default ActivityBox;

ActivityBox.propTypes = {
  activities: PropTypes.string,
};

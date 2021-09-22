import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import moment from 'moment';

import {
  Container,
  Header,
  ActivityDiv,
  TimeStamp,
  ActivityText,
  StyledDiv,
} from './StyledComponents';

const  Activity = ({ item }) => {
  return (
    <ActivityDiv>
      <TimeStamp>{moment(item?.alo_created_at).format('MMMM Do HH: mm')}</TimeStamp>
      <ActivityText fontStyle="bold">{item?.alo_subject}</ActivityText>
      <ActivityText>{item?.alo_description}</ActivityText>
    </ActivityDiv>
  );
}

function ActivityBox({ activities }) {
  return (
    <div>
      <Header>Activity</Header>
      <StyledDiv>
        <Container>
          {map(activities, item => (
            <Activity item={item} />
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

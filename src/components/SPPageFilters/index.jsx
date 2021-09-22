import React, { useEffect } from 'react';
import { Row } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { StyledDiv, StyledCol } from './StyledComponents';

function SPPageFilters({ options, active, onChange }) {
  let selected = false;
  return (
    <StyledDiv>
      <Row justify="start">
        {map(options, item => {
          if (active === item.key) {
            selected = true;
          } else {
            selected = false;
          }

          return (
            <StyledCol
              selected={selected}
              key={item.key}
              onClick={() => {
                onChange(item.key, item);
              }}
            >
              {item.value}
            </StyledCol>
          );
        })}
      </Row>
    </StyledDiv>
  );
}

export default SPPageFilters;

SPPageFilters.propTypes = {
  active: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

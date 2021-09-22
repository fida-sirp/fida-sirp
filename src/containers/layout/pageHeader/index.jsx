import React from 'react';
import { Layout, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { StyledCol, StyledLayout } from './StyledComponents';

function PageHeader({ title, options }) {
  return (
    <StyledLayout>
      <Row>
        <StyledCol flex={3}>{title}</StyledCol>
        <Col flex={7}>
          <Row justify="end" gutter={17}>
            {map(options, (item, index) => {
              if (item?.props?.title) return <Col key={index}> {item}</Col>;
            })}
          </Row>
        </Col>
      </Row>
    </StyledLayout>
  );
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

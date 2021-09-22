import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { automationDetail } from '../../../../../actions/automation';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';

const AutomationDetail = ({
  id,
  automationDetailActions,
  automationListStore,
}) => {
  useEffect(() => {
    automationDetailActions(id);
  }, [id]);
  let htmlData = '';
  map(automationListStore?.userData?.data, item => {
    htmlData = item?.ina_output_html || item?.ina_output;
  });
  return <div dangerouslySetInnerHTML={{ __html: htmlData }} />;
};

const mapStateToProps = state => {
  return {
    automationListStore: state.automation,
  };
};
const mapDispatchToProps = dispatch => ({
  automationDetailActions: (...args) => dispatch(automationDetail(...args)),
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(AutomationDetail);

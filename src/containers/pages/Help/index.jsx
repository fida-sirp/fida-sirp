import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import {
  listHelp
} from '../../../actions/help';
import PageHeader from '../../layout/pageHeader';
import HelpCard from './components/HelpCard';
 

const Help = ({listHelp,listData}) => {
  const history = useHistory();
  useEffect(() => {
    listHelp();
  }, []);

  return (
    <>
      <PageHeader
        title="Welcome to SIRP Help Center"
      />
      <div className="flex-wrap-d-flex"> 
        { 
            listData?.data?.items.map((item) =>
              <HelpCard data={item} />
            )
        }
      </div>
     
    </>
  );
};


const mapStateToProps = state => {
  return {
    listData: state.helpStore.listData,
    loading: state.helpStore.loading,
  };
};

const mapDispatchToProps = {
  listHelp
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Help);

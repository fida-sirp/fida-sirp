import React from 'react';
import { compose } from 'redux';
import { Row, Col, Modal } from 'antd';
import { map } from 'lodash';
import { useHistory } from 'react-router-dom';
import { RowDiv, BackArrowDiv } from './StyledComponents';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import PageHeader from '../../../../layout/pageHeader';
import SPButton from '../../../../../components/SPButton';
import PlusIcon from '../../../../../assets/svgIcon/plusIcon';
import SPCog from '../../../../../components/SPCog';
import BackArrowOutline from '../../../../../assets/svgIcon/backArrowOutline';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CardList/CreateCard'
import { connect } from 'react-redux';
import moment from 'moment';



const DashboardDraft = ({ userProfile, dashBoardList }) => {
  const history = useHistory();
  return (
    <>
      <RowDiv>
        <BackArrowDiv
          onClick={() => {
            history.push('/dashboard/list');
          }}
        >
          <BackArrowOutline />
        </BackArrowDiv>
        <PageHeader
          title="Dashboard draft"
          options={[
            <SPButton
              onButtonClick={() => {
                history.push('/dashboard/draft');
              }}
              title="Create Dashboard"
              size="small"
              image={<PlusIcon />}
            />,
            <SPCog onClick={() => { }} />,
          ]}
        />
      </RowDiv>
      <Row>
        <CreateCard
          title="Create new dashboard"
          data="Build your dashboards to have access to data that matters to you"
          onButtonClick={() => { history.push('/dashboard/create'); }}
        />
        {
          dashBoardList ?
            map(dashBoardList, item => (

              userProfile?.usr_organization === item?.das_organization && item.isDraft ?
                <CardList
                  key={item.das_create_at}
                  date={moment(item.das_create_at).format('YYYY / MM / DD')}
                  subject={item.das_name}
                  record={item}
                  details={item.das_description}
                  isInDraft={true}
                // showDashboard={true}
                />
                : null
            ))
            : null
        }
      </Row>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  dashBoardList: state.dashboardStore?.dashboardList?.listData
});

export default compose(
  connect(mapStateToProps),
  SetDocumentTitleHOC)
  (DashboardDraft);

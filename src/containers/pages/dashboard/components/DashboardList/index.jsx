import React, { useState } from 'react';
import { compose } from 'redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Row } from 'antd';
import { map } from 'lodash';
import { connect } from 'react-redux';

import { CreateDashboard } from '../../StyledComponents';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import BackArrowOutline from '../../../../../assets/svgIcon/backArrowOutline';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import PageHeader from '../../../../layout/pageHeader';
import SPButton from '../../../../../components/SPButton';
import PlusIcon from '../../../../../assets/svgIcon/plusIcon';
import SPCog from '../../../../../components/SPCog';
import CardList from '../CardList/CardList';
import CreateCard from '../CardList/CreateCard';
import { getDashboardList } from '../../../../../actions/dashboard';
import { RowDiv, BackArrowDiv } from './StyledComponent';
import { useEffect } from 'react';
import { hideLoader } from '../../../../../actions/apps';

const dashboardList = ({
    getDashboard,
  dashBoardList,
}) => {
    const history = useHistory();

    useState(() => {
    const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
        getDashboard(expand);
  }, []);


    return (
        <>
            <RowDiv>
                <BackArrowDiv
                    onClick={() => {
                        history.push('/dashboard');
                    }}
                >
                    <BackArrowOutline />
                </BackArrowDiv>
                <PageHeader
                    title="Dashboard List"
                    options={[
                        // <SPButton
                        //     title="Dashboard drafts"
                        //     size="small"
                        //     type="secondary"
                        //     onButtonClick={() => {
                        //         history.push('/dashboard/draft');
                        //     }}
                        // />,
                        <SPButton
                            onButtonClick={() => { history.push('/dashboard/create'); }}
                            title="Create Dashboard"
                            size="small"
                            image={<PlusIcon />}
                        />,
                        <SPCog onClick={() => { }} />,
                    ]}
                />
            </RowDiv>
            <Row>
                <CreateDashboard>
                    <CreateCard
                        title="Create new dashboard"
                        data="Build your dashboards to have access to data that matters to you"
                        onButtonClick={() => { history.push('/dashboard/create'); }}
                    />
                </CreateDashboard>
                {
                    dashBoardList &&
                        map(dashBoardList, item => (
                                <CardList
                                    record={item}
                                    isInDraft={false}
                                // date={moment(item.das_create_at).format('YYYY / MM / DD')}
                                // subject={item.das_name}
                                // details={item.das_description}
                                // showDashboard={true}
                                />

                        ))
                }
            </Row>
        </>
    );
};

const mapStateToProps = state => ({
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
  dashBoardList: state.dashboardStore?.dashboardList?.listData,
});

const mapDispatchToProps = dispatch => ({
  getDashboard: (...args) => dispatch(getDashboardList(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(dashboardList);

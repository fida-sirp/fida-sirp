import React, { useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';

import {
  onAddDashboard,
  onDeleteDashboard,
  onRemoveDashboard,
  onSetDefaultDashboard
} from '../../../../../actions/dashboard';

import GraphIcon from '../../../../../assets/images/graphIcon.png';
import DraftIcon from '../../../../../assets/images/draftIcon.png';
import EditIcon from '../../../../../assets/images/pencil.png';
import DeleteIcon from '../../../../../assets/images/delete.png';
import View from '../../../../../assets/images/view.png';

import {
  Container,
  StyledDiv,
  DetailsText,
  ContainerDiv,
  TimeStamp,
  IconImage,
  RowDiv,
  ColumnDiv,
  IconsWraper,
  SubjectText,
  MoreOptionsDiv,
  SetDefaultIcon,
  CardOverlay
} from './StyledComponents';

const CardList = ({
  isInDraft,
  record,
  userProfile,
  onSetDefaultDashboard,
  onRemoveDashboard,
  onDeleteDashboard,
  onAddDashboard
}) => {
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(true);
  const { confirm } = Modal;;

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete this Dashboard ?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        onDeleteDashboard(key)
      },
      onCancel() {
        setShowOptions(true)
      },
    });
  }

  return (
    <ContainerDiv onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(true)}>
      <StyledDiv>
        <Container>
          {isInDraft ? (
            <RowDiv>
              <IconImage src={DraftIcon} />
              <ColumnDiv>
                <SubjectText fontStyle="bold">Drafted On:</SubjectText>
                <TimeStamp>{moment(record?.das_create_at).format('YYYY / MM / DD')}</TimeStamp>
              </ColumnDiv>
            </RowDiv>
          ) : (
            <RowDiv>
              <IconImage src={GraphIcon} />
              <ColumnDiv>
                <SubjectText fontStyle="bold">Created On:</SubjectText>
                <TimeStamp>{moment(record?.das_create_at).format('YYYY / MM / DD')}</TimeStamp>
              </ColumnDiv>
            </RowDiv>
          )}

          <SubjectText bottomPadding fontStyle="bold">
            {record?.das_name}
          </SubjectText>
          <DetailsText bottomPadding dangerouslySetInnerHTML={{ __html: record?.das_description }}></DetailsText>
          {showOptions ? (
            <>
              <CardOverlay>
                <MoreOptionsDiv>
                  {
                    // !isInDraft ?
                    //   <IconsWraper>
                    //     <Tooltip placement="topLeft" title={'View Dashboard'}>
                    //       <SetDefaultIcon src={ViewIcon} />
                    //     </Tooltip>
                    //   </IconsWraper>
                    //   : null
                  }
                  {
                    // userProfile?.usr_id === record.das_created_by ?
                      <IconsWraper onClick={() => history.push(`/dashboard/view/${record.das_id}`)}>
                        <Tooltip placement="topLeft" title={"View Dashboard"}>
                          <SetDefaultIcon src={View} />
                        </Tooltip>
                      </IconsWraper>
                      // : null
                  }
                  {
                    // userProfile?.usr_id === record.das_created_by &&
                    <IconsWraper onClick={() => history.push(`/dashboard/edit/${record?.das_id}`)}>
                      <Tooltip placement="topLeft" title={isInDraft ? 'Edit Draft' : 'Edit Dashboard'}>
                        <SetDefaultIcon src={EditIcon} />
                      </Tooltip>

                    </IconsWraper>
                  }
                  {
                    userProfile?.usr_id === record.das_created_by &&
                    <IconsWraper onClick={() => showConfirm(record.das_id)}>
                      <Tooltip placement="topLeft" title={isInDraft ? 'Delete Draft' : 'Delete Dashboard'}>
                        <SetDefaultIcon src={DeleteIcon} />
                      </Tooltip>
                    </IconsWraper>
                  }
                  {/* {
                    !isInDraft && record.checkForRemove ?
                      <IconsWraper onClick={() => history.push({
                        pathname: `/dashboard/view/${record.das_id}`,
                        state: record
                      })}>
                        <Tooltip placement="topLeft">
                          <SetDefaultIcon src={View} />
                        </Tooltip>
                      </IconsWraper>
                      : null
                  } */}
                  {
                    record?.isDraft &&
                    <IconsWraper onClick={() => onAddDashboard(record.das_id)}>
                      <Tooltip placement="topLeft" title={'Add Dashboard'}>
                        <PlusOutlined style={{ padding: 3 }} />
                      </Tooltip>
                    </IconsWraper>
                  }

                  {
                    record.checkForRemove &&
                    <IconsWraper onClick={() => onSetDefaultDashboard(record.das_id, true)}>
                      <Tooltip placement="topLeft" title={'Make Default'}>
                        <StarOutlined className="star-icon" style={{ padding: 3, color: record.checkForDefault ? '#33C758' : '' }} />
                      </Tooltip>
                    </IconsWraper>
                  }

                  {
                    record.checkForRemove &&
                    <IconsWraper onClick={() => onRemoveDashboard(record.das_id)}>
                      <Tooltip placement="topLeft" title={'Remove Dashboard'}>
                        <CloseOutlined style={{ padding: 3, }} />
                      </Tooltip>
                    </IconsWraper>
                  }
                </MoreOptionsDiv>
              </CardOverlay>
            </>
          ) : null}
        </Container>
      </StyledDiv>

    </ContainerDiv>

  );
}

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  dashBoardList: state.dashboardStore?.dashboardList?.listData
});

const mapDispatchToProps = dispatch => ({
  onSetDefaultDashboard: (...payload) => dispatch(onSetDefaultDashboard(...payload)),
  onRemoveDashboard: (payload) => dispatch(onRemoveDashboard(payload)),
  onDeleteDashboard: (payload) => dispatch(onDeleteDashboard(payload)),
  onAddDashboard: (payload) => dispatch(onAddDashboard(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(CardList);


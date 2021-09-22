import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  deleteAutomationThreatList,
  updateAutomationThreatList,
  onGetListofBackups,
  onCreateBackup,
  onDowloadBackup,
  onDeleteListBackupList,
  onImporatBackup,
  onRestore,
  configureAutoBckUps,
  administratorGetBackupSetting,
} from '../../../../../../actions/administration';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import Download from '../../../../../../assets/svgIcon/download';
import Duplication from '../../../../../../assets/svgIcon/duplicate';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import BackupSetting from './BackUpSetting'
import SPTable from '../../../../../../components/SPTable';
import SPRiskTag from '../../../../../../components/SPRiskTag';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import CreateBackupForm from './CreateBackupForm';
import { Modal } from 'antd'
import RestorebackupForm from './RestorebackupForm'
import SPModal from '../../../../../../components/SPModal';

const BackUpRestore = ({
  getList,
  backupList,
  createList,
  isLoading,
  onGetDowloadedFile,
  deleteList,
  onImporatBackupRequest,
  onRestoreBackup,
  onConfigureAutoBckUps,
  onAdministratorGetBackupSetting,
  selectedBackupSetting,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showRestoreBackup, setShowRestoreBackup] = useState(false)
  const [isCreate, setIsCreate] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { confirm } = Modal;
  const [record, setRecord] = useState({})
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete this??',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteList(key, myArrayQry)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const {
    perPage = '20',
    pageNo = 1,
    feed_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(feed_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );
  const [backupSettingDrawer, setBackupSettingDrawer] = useState(false);

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (backupList) {
      setTotalCount(backupList?._meta?.totalCount);
      setCurrentPage(backupList?._meta?.currentPage);
    }
  }, [backupList]);


  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      editable: false,
      key: (text, record, index) => record?.id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Description',
      dataIndex: 'comment',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.comment,
    },

    {
      title: 'Version',
      dataIndex: 'version',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.version,
    },
    {
      title: 'Status',
      dataIndex: 'record?.status',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.status,
      render: (text, record, index) => {
        if (record?.status === 'Completed') {
          return <SPRiskTag type="primary" text={record?.status} />
        }
      }
    },
    {
      title: 'Backup Time',
      dataIndex: 'backupTime',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.feed_id,
    },
    {
      title: 'Backup Age',
      dataIndex: 'backupAge',
      editable: false,
      key: (text, record, index) => record?.feed_id,
    },
    {
      title: 'Actions',
      dataIndex: 'feed_id',
      editable: false,
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("download-backup-restore"))){
          const downloadBackup =   {
            key: 'dowload',
            label: 'Dowload',
            icon: <Download />,
            onClickItem: () => {
              onGetDowloadedFile(record?.id)
            },
          };
          moreItems.push(downloadBackup);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("restore-backup-restore"))){
          const restoreBackup ={
            key: 'restorebackup',
            label: 'Restore Backup',
            icon: <Duplication />,
            onClickItem: () => {
              onRestoreBackup(record?.id)
            },
          };
          moreItems.push(restoreBackup);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-backup-restore"))){
          const deleteBackup = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.id),
          };
          moreItems.push(deleteBackup);
        }

        if (moreItems.length !==0 ) {
          return (
              <SPSingleSelectDropdown
                  items={moreItems}
                  onSelect={() => {
                  }}
                  title="more"
              />
          );
        }
      },
    },
  ];

  const getPublisherList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry, path });
  };

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.pageNo) {
        queryObject.payload.page = parsedQuery.pageNo;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.feed_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.feed_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'RssFeedSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'RssFeedSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('pageNo', pageNumber);
    window.scrollTo(0, 0);
  };

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      delete obj['active_tab'];
      const str = queryString.stringify(obj);
      if (name == 'perPage') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };


  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;

    if (sorter.order === 'ascend') {
      console.log({ columnIndex });
    } else if (sorter.order === 'descend') {
      columnIndex = '-' + columnIndex;
    } else {
      columnIndex = undefined;
    }

    if (columnIndex !== undefined && columnIndex !== sort) {
      handleChange('sort', columnIndex);
    }
  };


  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration?active_tab=automation&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration?active_tab=automation&&' + qs);
    }
    setQuery(qs);
  };

  const handleCreateBackup = (values) => {
    const myArrayQry = mapQueryWithApi(query);
    createList(values, myArrayQry);
    setOpenDrawer(false);
  }

  const handleCreateBackupSetting = (values) => {
    onConfigureAutoBckUps(values);
  }

  const handleRestoreBackup = (data) => {
    if (data) {

   //   console.log('>>>>>>>>>>> data: ', {data});
      // onImporatBackupRequest(data)
    }
  }

  return (
    <>
      <SPDrawer
        title={`Backup Settings`}
        isVisible={backupSettingDrawer}
        onClose={() => setBackupSettingDrawer(false)}
      >
        <BackupSetting
          isVisible={backupSettingDrawer}
          submitHandler={handleCreateBackupSetting}
          selectedBackupSetting={selectedBackupSetting}
          closeDrawer={() => {
            setBackupSettingDrawer(false);
          }}
        />
      </SPDrawer>
      <SPDrawer
        title={`Restore Backup`}
        isVisible={showRestoreBackup}
        width={950}
        onClose={() => setShowRestoreBackup(false)}
      >
      <RestorebackupForm
        isVisible={showRestoreBackup}
        submit={handleRestoreBackup}
        onCloseDrawer={() => setShowRestoreBackup(false)}
      />
      </SPDrawer>
      <PageHeader
        title="Backup & Restore"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("database-backup-backup-restore"))) &&
          <SPButton
            title="Create Backup"
            onButtonClick={async () => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            size="small"
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("settings-backup-restore"))) &&
          <SPButton
            title="Configure Automatic Backups"
            onButtonClick={() => {
              onAdministratorGetBackupSetting();
              setBackupSettingDrawer(true)
            }}
            size="small"
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("import-backup-backup-restore"))) &&
          <SPButton
            title="Restore"
            onButtonClick={async () => {
              setIsCreate(true);
              setShowRestoreBackup(true)
            }}
            size="small"
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("refresh-backup-restore"))) &&
          <SPButton
            title="Refresh"
            onButtonClick={() => getPublisherList()}
            size="small"
          />
        ]}
      />
      <SPTable
        columns={columns}
        dataSource={backupList?.items}
        onPageChange={onPageChange}
        handleTableChange={handleTableChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={isLoading}
      />
      <SPDrawer
        title={`Create Backup`}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsCreate(false);
        }}
      >
        <CreateBackupForm
          isVisible={openDrawer}
          submit={handleCreateBackup}
          closeDrawer={() => {
            setOpenDrawer(false);
          }}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  backupList: state.administration?.productSettingList?.backupList,
  selectedBackupSetting: state.administration?.selectedBackupSetting?.listData,
  isLoading: state.administration?.productSettingList?.loading
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(onGetListofBackups(payload)),
  updateList: payload => dispatch(updateAutomationThreatList(payload)),
  deleteList: (...args) => dispatch(onDeleteListBackupList(...args)),
  createList: (...args) => dispatch(onCreateBackup(...args)),
  onGetDowloadedFile: (...args) => dispatch(onDowloadBackup(...args)),
  onImporatBackupRequest: (payload) => dispatch(onImporatBackup(payload)),
  onRestoreBackup: (payload) => dispatch(onRestore(payload)),
  onConfigureAutoBckUps: (payload) => dispatch(configureAutoBckUps(payload)),
  onAdministratorGetBackupSetting: (payload) => dispatch(administratorGetBackupSetting(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(BackUpRestore);

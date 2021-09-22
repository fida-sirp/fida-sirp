/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';

import queryString, { parse } from 'query-string';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Row, Col, Modal, message } from 'antd';
import {
  listPlaybook,
  deletPlaybook,
  duplicatePlaybook,
  resetDuplicatePlaybookstore,
  playBookDowload,
  onImportPlaybook
} from '../../../actions/playbooks';

import SPDrawer from '../../../components/SPDrawer';
import ImportPlayBooks from './components/import';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import SPButton from '../../../components/SPButton';
import SPSelect from '../../../components/SPSelect';
import SPSearch from '../../../components/SPSearch';
import PageHeader from '../../layout/pageHeader';
import SPCog from '../../../components/SPCog';
import SPTable from '../../../components/SPTable';
import { AlertBox } from '../assets/StyledComponents';
import Pencil from '../../../assets/svgIcon/pencil';
import Dowload from '../../../assets/svgIcon/download';
import Dustbin from '../../../assets/svgIcon/dustbin';
import Duplicate from '../../../assets/svgIcon/duplicate';
import View from '../../../assets/svgIcon/view';
import SettingIcon from '../../../assets/svgIcon/setting/index';
import SPSingleSelectDropdown from '../../../components/SPSingleSelectDropdown';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';

const showingFilter = [
  {
    key: '10',
    value: '10',
  },
  {
    key: '20',
    value: '20',
  },
  {
    key: '30',
    value: '30',
  },
  {
    key: '50',
    value: '50',
  },
];
function Playbook({
  access,
}) {
// const Playbook = () => {
  const dispatch = useDispatch();

  const { loading, error, DuplicationSuccess } = useSelector(
    state => state.playbookStore
  );

  const CHECK = useSelector(state => state.playbookStore);
  const playBooklist = useSelector(
    state => state.playbookStore.playbookDataList
  );
  const [query, setQuery] = useState(location.search);
  // const [mypage, setMypage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [totalCount, setTotalCount] = useState(1);
  const [playbookListitem, setPLaybookListitem] = useState([]);

  function showConfirm(id) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Playbook?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        dispatch(deletPlaybook(id, myArrayQry));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const [isopenSideDrawer, setisopenSideDrawer] = useState(false);
  const history = useHistory();

  const handleQuery = qs => {
    history.push('/playbooks?' + qs);
    setQuery(qs);
  };

  const {
    plb_page_no = 1,
    plb_subject,
    plb_showing = '20',
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(plb_subject);
  const [currentPage, setCurrentPage] = useState(parseInt(plb_page_no, 10));

  useEffect(() => {
    const queryObject = {
      plb_subject: plb_subject,
      ...(plb_showing !== '20' && { plb_showing: plb_showing }),
      ...(plb_page_no !== 1 && { plb_page_no: plb_page_no }),
    };
    // setMypage(plb_page_no);
    setShowing(plb_showing);
  }, [searchText, plb_showing]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  function setColumnsForSpecificNumber(number) {
    return [
      {
        title: 'ID',
        dataIndex: 'index',
        editable: false,
        key: (text, record, index) => record.plb_id,
        render: (text, record, index) => (number - 1) * showing + index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'playbook_name',
        render: (text, record, index) => {
          return record.plb_name;
        },
      },
      {
        title: 'Use Case Family',
        dataIndex: 'user_case_family',
        render: (text, record, index) => {
          if (record.playbookCategory && record.playbookCategory !== null) {
            return record.playbookCategory.pc_name;
          } else {
            return '(not set)';
          }
        },
      },
      {
        title: 'Status',
        dataIndex: 'playbook_status',
        render: (text, record, index) => record.plb_status,
      },

      {
        title: 'Actions',
        dataIndex: 'playbook_actions',

        render: (text, record, index) => {

            const moreItems = [];

            if(access!==undefined && (access.includes("all-super-admin") || access.includes("view-playbooks"))){
              const viewPlaybook=  {
                key: 'view',
                label: 'View',
                icon: <View />,
                onClickItem: () => {
                  history.push(`/playbook/${record.plb_id}`);
                },
              };
              moreItems.push(viewPlaybook);
            }

            if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-playbooks"))){
              const editPlaybook=  {
                key: 'edit',
                label: 'Edit',
                icon: <Pencil />,
                onClickItem: () => {
                  history.push(`/playbook/update/${record.plb_id}`);
                },
              };
              moreItems.push(editPlaybook);
            }
            if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-playbooks"))){
              const deletePlaybook=  {
                key: 'delete',
                label: 'Delete',
                icon: <Dustbin />,
                onClickItem: () => {
                  showConfirm(record.plb_id);
                },
              };
              moreItems.push(deletePlaybook);
            }
            if(access!==undefined && (access.includes("all-super-admin") || access.includes("download-playbooks"))){
              const downloadPlaybook= {
                key: 'download',
                label: 'Download',
                icon: <Dowload />,
                onClickItem: async () => {
                  const myArrayQry = mapQueryWithApi(query);
                  dispatch(playBookDowload(record.plb_id, record.plb_name, myArrayQry));
                },
              };
              moreItems.push(downloadPlaybook);
            }
            if(access!==undefined && (access.includes("all-super-admin") || access.includes("create-playbooks"))){
              const addrulePlaybook=  {
                key: 'add-rule',
                label: 'Add Rules',
                icon: <SettingIcon />,
                onClickItem: () => {
                  handleAddRule(record?.plb_id, record.plb_name);
                },
              };
              moreItems.push(addrulePlaybook);
            }
            if(access!==undefined && (access.includes("all-super-admin") || access.includes("duplicate-playbooks"))){
              const duplicatePlaybook=  {
                key: 'duplicate',
                label: 'Duplicate',
                icon: <Duplicate />,
                onClickItem: async () => {
                  const myArrayQry = mapQueryWithApi(query);
                  dispatch(duplicatePlaybook(record.plb_id, myArrayQry));
                },
              };
              moreItems.push(duplicatePlaybook);
            }

          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        },
      },
    ];
  }

  const [columns, setColumns] = useState(setColumnsForSpecificNumber(1));

  const handleAddRule = (id, name) => {
    history.push({
      pathname: `/playbook-rule/${id}`,
      state: { playbookName: name }
    });
  };
  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);

    if (parsedQuery) {
      const queryObject = { payload: {}, PlaybooksSearch: {}, QueryString: '' };
      if (parsedQuery.plb_page_no) {
        queryObject.payload.page = parsedQuery.plb_page_no;
      }
      if (parsedQuery.plb_subject) {
        queryObject.PlaybooksSearch.search = parsedQuery.plb_subject;
      }
      if (parsedQuery.plb_showing) {
        queryObject.payload['per-page'] = parsedQuery.plb_showing;
      }

      const playbooksearch = queryObject.PlaybooksSearch;

      if (Object.keys(playbooksearch).length !== 0) {
        Object.entries(playbooksearch).forEach(([key, val]) => {
          myArrayQry += 'PlaybooksSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }
    return myArrayQry;
  }

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    dispatch(listPlaybook({ queryItem: myArrayQry }));
  }, [query]);

  useEffect(() => {
    if (Object.keys(playBooklist).length !== 0) {
      setPLaybookListitem(playBooklist.data.items);
      setTotalCount(playBooklist.data._meta.totalCount);
      setCurrentPage(playBooklist.data._meta.currentPage);
      setColumns(
        setColumnsForSpecificNumber(playBooklist.data._meta.currentPage)
      );
    }
  }, [playBooklist]);

  const onPageChange = pageNumber => {
    handleChange('plb_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  const onImportDrawerClose = () => {
    setisopenSideDrawer(false);
  };

  const importPlaybookHandler = value => {
    dispatch(onImportPlaybook(value));
    setisopenSideDrawer(false);
  }

  return (
    <div>
      <PageHeader title="Playbooks" options={[<SPCog onClick={() => { }} />]} />
      {error ? (
        <AlertBox message={error.message} type="error" closable />
      ) : null}
      {/* playBooklist */}
      {CHECK.DuplicationSuccess ? (
        <AlertBox
          message="Duplicate playbook successfully"
          type="success"
          closable
          onClick={() => dispatch(resetDuplicatePlaybookstore())}
        />
      ) : null}
      <Row gutter={[19, 25]}>
        <Col span={12} style={{ display: 'flex' }}>
          <div style={{ marginRight: 20 }}>
            <SPSearch
              size="500px"
              onChange={e => {
                setSearchText(e.target.value);
              }}
              text={searchText}
              onEnter={() => {
                handleChange('plb_subject', searchText);
              }}
            />
          </div>
          <div >
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={plb_showing}
              onChange={e => {
                handleChange('plb_showing', e.key);
              }}
            />
          </div>
        </Col>
        <Col
          span={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
        {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('create-playbooks'))) ? (
          <div style={{ marginRight: 10 }}>
            <SPButton
              title="Create Playbook"
              size="small"
              onButtonClick={() => history.push('/playbooks/create')}
            />
          </div>
          ) : ""}
          {/* TODO: Need to be removed when going for production */}
            {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('import-playbooks'))) ? (
          <div style={{ marginRight: 10 }}>
            <SPButton
              title="Import Playbook"
              size="small"
              onButtonClick={() => setisopenSideDrawer(true)}
            />
            <SPDrawer
              title="Import Playbook"
              isVisible={isopenSideDrawer}
              onClose={onImportDrawerClose}
              drawerWidth={800}
            >
              <ImportPlayBooks
                onCancel={onImportDrawerClose}
                onImport={importPlaybookHandler}
              />
            </SPDrawer>
          </div>
                ) : ""}
          {/* TODO: Need to be removed when going for production */}
          {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-playbooks-queue'))) ? (
          <div style={{ marginRight: 10 }}>
            <SPButton
              title="Playbook Logs"
              size="small"
              onButtonClick={() =>
                history.push('/playbooks-queue')
              }
            />
          </div>
          ) : ""}

        </Col>
      </Row>

      <SPTable
        columns={columns}
        dataSource={playbookListitem}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={plb_showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * plb_showing + 1
        }
        currentPage={currentPage}
        isLoading={loading}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {

    access :  state?.userStore?. userProfile?.data?.access
  };
};
export default compose(
  connect(mapStateToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Playbook);

//export default SetDocumentTitleHOC(Playbook);

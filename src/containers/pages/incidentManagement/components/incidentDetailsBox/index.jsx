import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  find,
  includes,
  filter,
  concat,
  map,
  set,
  isEmpty,
  isObject,
  isString,
  identity,
} from 'lodash';
import { Row, Col, Modal, Image } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import InfoTab from '../infoTab';

import ImageWithHeader from '../../../../../components/ImageWithHeader';
import SPRiskTag from '../../../../../components/SPRiskTag';
import SPButton from '../../../../../components/SPButton';
import SPMultiSelectDropdown from '../../../../../components/SPMultiSelectDropdown';
import SPSingleSelectDropdown from '../../../../../components/SPSingleSelectDropdown';
import SPDrawer from '../../../../../components/SPDrawer';
import EditTicket from '../editTicket';
import ContextMenu from '../contextMenu';
import { listIncidentDisposition } from '../../../../../actions/incidentManagement';
import sirpDes from '../../../../../assets/images/sirpdesc.png';
import {
  Container,
  Header,
  StyledRow,
  StyledDiv,
  Separator,
  RowDiv,
  ImagePDiv,
  SImage,
  Wrapper,
} from './StyledComponents';
import { Colors } from '../../../../../theme';
import Pencil from '../../../../../assets/svgIcon/pencil';
import { isArray } from 'lodash';

function IncidentDetailsBox({
  incident,
  formMaster,
  incidentDetails,
  formLoader,
  Disposition,
  listIncidentDisposition,
  onChangeCategory,
  onChangeDisposition,
  updateDisposition,
  onFormSubmit,
  onAddArtifactAction,
  onChangeSubCategoryAction,
  drawerTitle = 'Edit Incident',
  formType,
  access,
}) {
  const [selectedDisposition, setSelectedDisposition] = useState(0);
  const [dispositionOptions, setDispositionOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const outerRef = useRef(null);

  useEffect(() => {
    listIncidentDisposition();
  }, []);

  useEffect(() => {
    if (incident?.iti_id) {
      onChangeCategory(incident?.iti_category_id);
    }
  }, [incident?.iti_id]);

  useEffect(() => {
    const DispositionData = [];
    if (Disposition?.success === true) {
      if (Object.keys(Disposition).length !== 0) {
        if (isArray(Disposition?.data)) {
          Disposition.data.forEach(data => {
            DispositionData.push({
              key: data?.ids_id,
              label: data?.ids_name,
              value: String(data?.ids_id),
            });
          });
        }
      }
    }
    setDispositionOptions(DispositionData);
  }, [Disposition]);

  const [selectedSubCategory, setSelectedSubCategory] = useState(['']);

  useEffect(() => {
    if (incident?.itiDispositionSubCategory) {
      setSelectedSubCategory(incident?.itiDispositionSubCategory);
    }
    if (incident?.iti_disposition_id) {
      setSelectedDisposition(String(incident?.iti_disposition_id));
    }
    if (
      incident?.iti_category_details &&
      isString(incident?.iti_category_details)
    ) {
      setSelectedSubCategory(
        incident?.iti_category_details.split(',').map(s => s.trim())
      );
    }
  }, [incident]);



  const [previousState, setPreviousState] = useState();
  const onChangeSubCategory = (item, selected) => {
    const newItems = selected
      ? filter(selectedSubCategory, filterKey => {
          return filterKey !== item;
        })
      : concat(selectedSubCategory, item);

    setSelectedSubCategory(newItems);

    onChangeSubCategoryAction(
      newItems.map(n => {
        if (isString(n)) {
          return n;
        }
        if (isObject(n)) {
          return Object.values(n)?.[0];
        }
      })
    );
  };

  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const onEditDrawerOpen = () => {
    setIsEditDrawerVisible(true);
    localStorage.setItem('isEdit', 1);
  };
  const onEditDrawerClose = (imported = false) => {
    // if (imported === true) {
    //   setIsAssetImported(imported);
    //   setTimeout(() => {
    //     setIsAssetImported(false);
    //   }, 3000);
    // }
    localStorage.setItem('isEdit', 0);
    setIsEditDrawerVisible(false);

      incidentDetails(incident?.iti_id);
  };
  function showConfirm(key) {
    const newValue = find(dispositionOptions, function (d) {
      return String(d.key) === String(key);
    })?.label;
    const oldValue = find(dispositionOptions, function (d) {
      return String(d.key) === String(selectedDisposition);
    })?.label;

    const title = (
      <text>
        Please confirm if you whish to change the disposition from{' '}
        <text style={{ color: Colors.primaryGreen }}>{oldValue}</text> to{' '}
        <text style={{ color: Colors.primaryGreen }}>{newValue}</text> ?
      </text>
    );
    Modal.confirm({
      title: title,
      centered: true,
      okText: 'Confirm',
      onOk() {
        setSelectedDisposition(key);
        updateDisposition(key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const Row1 = (
    <StyledDiv>
      <div>
        <InfoTab label="Analyst" value={incident?.itiOpenedBy?.usr_name} />
        <InfoTab
          label="Estimated Recovery Clock"
          value={incident?.iti_estimated_recovery_clock}
        />
        <InfoTab
          label="Estimated Recovery Hours"
          value={incident?.iti_estimated_recovery_hours}
        />
        <InfoTab
          label="Attack Duration"
          value={incident?.iti_attack_duration}
        />
      </div>
      <div>
        <InfoTab label="Attack Ended" value={incident?.iti_attack_ended} />
        <InfoTab
          label="Users Affected"
          value={incident?.iti_approx_users_affeacted}
        />
        <InfoTab
          label="Hosts Affected"
          value={incident?.iti_approx_host_affeacted}
        />
        <InfoTab
          label="Escalation Date"
          value={
            incident?.iti_escalation_date ? incident?.iti_escalation_date : ''
          }
        />
      </div>
      <div>
        <InfoTab label="Close Date " value={incident?.iti_close_date} />
        <InfoTab
          label="Data Compromised"
          value={incident?.iti_data_compromised}
        />
        <InfoTab
          label="Detection Method"
          value={incident?.itiAwareIncident?.iat_name}
        />
      </div>
    </StyledDiv>
  );

  function Row2() {
    const subCategoryList = isArray(formMaster?.incidentMasterSubCategory)
      ? formMaster?.incidentMasterSubCategory
      : [];

    const items = filter(subCategoryList, ({ key }) => {
      return includes(selectedSubCategory, key);
    }).map(s => {
      return {
        ...s,
        detals: s,
      };
    });
    let title = '';
    map(items, ({ label }, index) => {
      title += label;
      if (index !== items.length - 1) title += ', ';
    });

  
    const dropdown = (

      <SPMultiSelectDropdown
        labelKey="label"
        items={subCategoryList}
        onChange={onChangeSubCategory}
        selectedItems={selectedSubCategory}
        title={title || 'Select Sub Category'}
        borderColor={Colors.primaryWhite}
        dropIcon={<Pencil />}
        onMenuClose={value => {
          setDropdownVisible(value);
          if (isEmpty(selectedSubCategory)) {
            setSelectedSubCategory(previousState);
          }
        }}
        disabled={
         (incident?.iti_ticket_status === "Open")?
          (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? false : true :

         (incident?.iti_ticket_status === "Close")?
         (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? false : true : ""

        }

        height="30px"
      />
    );

    const clickableText = (
      <>
      <text
        role="presentation"
        onClick={() => {
          setDropdownVisible(true);
          setPreviousState(selectedSubCategory);
        }}
        style={{ cursor: 'pointer' }}
      >
        {title || 'No Sub-Category Selected'}
          &nbsp;&nbsp;
        {
         (incident?.iti_ticket_status === "Open")?
          (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ?  <Pencil  onClick={() => {
          setDropdownVisible(true);
          setPreviousState(selectedSubCategory);
        }}/>  : "" :

         (incident?.iti_ticket_status === "Close")?
         (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ?  <Pencil  onClick={() => {
         setDropdownVisible(true);
        setPreviousState(selectedSubCategory);
       }}/>  : "" : ""

        }


      </text>
     
      </>
    );

    return (
      <StyledDiv>
        <InfoTab
          label="Subcategories"
          value={dropdownVisible ? dropdown : clickableText}
        />
       
      </StyledDiv>
    );
  }

  const Row3 = (
    <StyledDiv>
      <InfoTab label="Owner / Custodian" value={incident?.iti_owner} />
    </StyledDiv>
  );
  const imageContent = (
    <ImagePDiv>
      {isArray(incident?.evidenceAttachment) &&
        incident?.evidenceAttachment.map(item => {
          if (
            ['jpg', 'jpeg', 'png', 'gif'].includes(
              item.attachment.split('.')[1]
            )
          ) {
            return <ImageWithHeader width={183} path={item.path} />;
          } else {
            return (
              <a
                href={item.path}
                target="_blank"
                style={{ width: 120 }}
                download
              >
                <div>
                  <FileOutlined style={{ fontSize: 100, color: '#fff' }} />
                </div>
                <div
                  style={{ color: '#fff', padding: 7, wordBreak: 'break-all' }}
                >
                  {item.attachment}
                </div>
              </a>
            );
          }
        })}
    </ImagePDiv>
  );
  const Row4 = (
    <StyledDiv>
      <InfoTab
        label="Description"
        value={
          <>
            {' '}
            <span
              dangerouslySetInnerHTML={{
                __html: incident?.iti_description,
              }}
            ></span>
          </>
        }
        type="vertical"
        imageContent={imageContent}
      />
    </StyledDiv>
  );

  const ThreatIntelDetails = () => {
    if (incident?.itiDisposition?.ids_name !== 'Threat Intel') {
      return null;
    }
    return (
      <>
        <StyledDiv>
          <InfoTab
            label="Affected Vendors"
            value={<>{incident?.iti_adv_affected_vendors}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>
        <Separator />

        <StyledDiv>
          <InfoTab
            label="Affected Products"
            value={<>{incident?.iti_adv_affected_products}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>
        <Separator />

        <StyledDiv>
          <InfoTab
            label="Location"
            value={<>{incident?.itiLocation?.loc_name}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>
        <Separator />
      </>
    );
  };

  const RiskDetails = () => {
    if (incident?.itiDisposition?.ids_name !== 'Risk') {
      return null;
    }
    return (
      <>
        <StyledDiv>
          <InfoTab
            label="Business Group"
            value={<>{incident?.iti_rk_business_group_name}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>
        <Separator />

        <StyledDiv>
          <InfoTab
            label="Asset Group"
            value={<>{incident?.iti_rk_asset_group_name}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>
        <Separator />

        <StyledDiv>
          <InfoTab
            label="Subgroup"
            value={<>{incident?.iti_rk_subgroup_name}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>

        <Separator />

        <StyledDiv>
          <InfoTab
            label="Asset Type"
            value={<>{incident?.iti_rk_asset_type_name}</>}
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>

        <Separator />

        <StyledDiv>
          <InfoTab
            label="Affected Assets"
            value={
              <>
                {isArray(incident?.incidentAssets?.[0])
                  ? incident?.incidentAssets?.[0]
                      .map(asset => asset.ast_hostname)
                      .join(',')
                  : ''}
              </>
            }
            type="vertical"
            imageContent={imageContent}
          />
        </StyledDiv>
        <Separator />
      </>
    );
  };

  const Row5 = (
    <StyledDiv>
      <InfoTab
        label="Analysis Summary"
        value={
          <>
            <span style={{color:"#fff!important"}}
              dangerouslySetInnerHTML={{
                __html: incident?.iti_analysis_summary,
              }}
            ></span>
          </>
        }
        type="vertical"
      />
    </StyledDiv>
  );
  const Row6 = (
    <StyledDiv>
      <InfoTab
        label="Damage details"
        value={
          <>
            <span
              dangerouslySetInnerHTML={{
                __html: incident?.iti_system_damage_detail,
              }}
            ></span>
          </>
        }
      />
    </StyledDiv>
  );

  function setPriorityType(iti_priority) {
    let type = 'danger';
    if (iti_priority === 'High') {
      type = 'danger';
    }
    if (iti_priority === 'Medium') {
      type = 'warning';
    }
    if (iti_priority === 'Low') {
      type = 'success';
    }
    return type;
  }
  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString().split('↵').join('');
    setSelectedText(selectedText);
  };

  return (
    <Wrapper>
      <Header>
        <RowDiv>
          <InfoTab
            label={`${incident?.itiDisposition?.ids_name ?? ''} type`}
            value={incident?.itiCategory?.ica_name}
          />
          <InfoTab
            label="Priority"
            value={
              <SPRiskTag
                text={incident?.iti_priority}
                type={setPriorityType(incident?.iti_priority)}
              />
            }
          />
          <InfoTab label="Date detected" value={incident?.iti_detect_date} />
          <InfoTab label="Duration" value={incident?.iti_attack_duration} />
        </RowDiv>
        <StyledRow gutter={15} justify="end">

           {
             (incident?.iti_ticket_status === "Open")?
              (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ?   (
          <Col>
                  <SPButton
                    type="secondary"
                    title="Edit"
                    size="small"
                    onButtonClick={onEditDrawerOpen}
                  />
                  <SPDrawer
                    maskClosable={false}
                    title={drawerTitle}
                    isVisible={isEditDrawerVisible}
                    onClose={onEditDrawerClose}
                  >
                    <EditTicket
                      formType={formType}
                      formMaster={formMaster}
                      formLoader={formLoader}
                      onChangeCategory={onChangeCategory}
                      onChangeDisposition={onChangeDisposition}
                      item={incident}
                      onFormSubmit={values => {
                        setIsEditDrawerVisible(false);
                        onFormSubmit(values);
      		  localStorage.setItem('isEdit', 0);
                        incidentDetails(incident?.iti_id);
                      }}
                      onCancel={() => {
                        setIsEditDrawerVisible(false);
      	          localStorage.setItem('isEdit', 0);
                        incidentDetails(incident?.iti_id);
                      }}
                    />
                  </SPDrawer>
                </Col>
              )  : "" :

             (incident?.iti_ticket_status === "Close")?
             (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ?   (
               <Col>
            <SPButton
              type="secondary"
              title="Edit"
              size="small"
              onButtonClick={onEditDrawerOpen}
                 />
            <SPDrawer
              maskClosable={false}
              title={drawerTitle}
              isVisible={isEditDrawerVisible}
              onClose={onEditDrawerClose}
            >
              <EditTicket
                formType={formType}
                formMaster={formMaster}
                formLoader={formLoader}
                onChangeCategory={onChangeCategory}
                onChangeDisposition={onChangeDisposition}
                item={incident}
                onFormSubmit={values => {
                  setIsEditDrawerVisible(false);
                  onFormSubmit(values);
		  localStorage.setItem('isEdit', 0);
                  incidentDetails(incident?.iti_id);
                }}
                onCancel={() => {
                  setIsEditDrawerVisible(false);
	          localStorage.setItem('isEdit', 0);
                  incidentDetails(incident?.iti_id);
                }}
              />
            </SPDrawer>
          </Col>
             )  : "" : ""
           }

          {incident?.iti_type == "incident"
          &&
          
          <Col style={{ height: 33 }}>
            <SPSingleSelectDropdown
              title={
                isArray(dispositionOptions)
                  ? dispositionOptions.find(
                      opt => opt.value === selectedDisposition
                    )?.label
                  : ''
              }
              onSelect={({ key }) => showConfirm(key)}
              items={dispositionOptions}
              selectedItem={selectedDisposition}
              type="secondary"
              size="small"
              disabled={
               (incident?.iti_ticket_status === "Open")?
                (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? false : true :

               (incident?.iti_ticket_status === "Close")?
               (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? false : true : ""

              }
            />
          </Col>
          }
        </StyledRow>
      </Header>

      <ContextMenu
        onAdd={onAddArtifactAction}
        outerRef={outerRef}
        selectedText={selectedText}
        artifact_type={
          isObject(formMaster?.incidenArtifactList?.result)
            ? Object.keys(formMaster?.incidenArtifactList?.result).map(k => {
                return {
                  label: formMaster?.incidenArtifactList?.result[k],
                  value: k,
                };
              })
            : []
        }
      />
      <Container ref={outerRef}>
        {Row1}
        <Separator />
        {Row2()}
        <Separator />
        {Row3}
        <Separator />
        {Row4}
        <Separator />
        {ThreatIntelDetails()}

        {RiskDetails()}
        {Row5}
        <Separator />
        {Row6}
      </Container>
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    Disposition: state.incidentDispositionStore.listData,
    access :  state?.userStore?. userProfile?.data?.access,
  };
};

const mapDispatchToProps = {
  listIncidentDisposition,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetailsBox);

IncidentDetailsBox.propTypes = {
  incident: PropTypes.object,
};

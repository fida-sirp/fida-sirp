import React, { useState, useEffect, useParams } from 'react';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SPTable from '../../../../components/SPTable';
import DetailsTable from '../components/detailsTable';
import { StyledDiv, StyledText, StyledButton } from './StyledComponents';
import BackArrowOutline from '../../../../assets/svgIcon/backArrowOutline';
import { singleAsset, assetDashboard, getAssetTypeById } from '../../../../actions/assets';
import { singleOwner } from '../../../../actions/owners';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import SPRiskTag from '../../../../components/SPRiskTag';



const columns = [
  {
    title: 'ID',
    dataIndex: 'iti_tid',
    editable: false,
    width:90,
  },
  {
    title: 'Subject',
    dataIndex: 'iti_subject',
    editable: false,
    width: 700,
  },
  {
    title: 'Severity',
    dataIndex: 'iti_attack_severity',
    editable: false,
     width: 200,
    render: t => {
      if (t === 'High') {
        return <SPRiskTag type="danger" text={t} width={'80px'} />;
      }
      if (t === 'Medium') {
        return <SPRiskTag type="warning" text={t} width={'80px'} />;
      }
      if (t === 'Low') {
        return <SPRiskTag type="success" text={t} width={'80px'}/>;
      }
    },
  },
  {
    title: 'Categroy',
    dataIndex: 'ica_name',
     width:200,
    editable: false,
  },
 
  
  
];

const advisoriesCol =  [
  {
    title: 'ID',
    dataIndex: 'adv_id',
    editable: false,
    width:90
  },
  {
    title: 'Title',
    dataIndex: 'adv_title',
    editable: false,
    width: 700,
  },
  {
    title: 'Severity',
    dataIndex: 'adv_severity',
    editable: false,
     width:200,
    render: t => {
      if (t === 'High') {
        return <SPRiskTag type="danger" text={t} width={'80px'} />;
      }
      if (t === 'Medium') {
        return <SPRiskTag type="warning" text={t} width={'80px'}/>;
      }
      if (t === 'Low') {
        return <SPRiskTag type="success" text={t} width={'80px'} />;
      }
    },
  },
  {
    title: 'Categroy',
    dataIndex: 'adc_name',
    editable: false,
     width:200
  },


];

const risksCol =  [
  {
    title: 'ID',
    dataIndex: 'rga_id',
    editable: false,
     width:90
  },
  {
    title: 'Name',
    dataIndex: 'rga_risk_name',
    editable: false,
    width: 700,
  },
  {
    title: 'Risk Rating',
    dataIndex: 'rga_risk_rating',
    editable: false,
     width:200,
    render: t => {
      let rating  = parseInt(t);
      if (t > 66) {
        return <SPRiskTag type="danger" text={"High"}  width={'80px'}/>;
      }
      if (t > 33 && t < 66) {
        return <SPRiskTag type="warning" text={"Medium"} width={'80px'} />;
      }
      if (t <= 33) {
        return <SPRiskTag type="success" text={"Low"}  width={'80px'}/>;
      }
    },
    
 
  },
  {
    title: 'Owner',
    dataIndex: 'rga_owner',
    editable: false,
     width:200
  }
  

];

const vulnerabilitiesCol =  [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
     width:90
  },
  {
    title: 'Name',
    dataIndex: 'vva_vulunerbility_name',
    editable: false,
    width: 700,
  },
  {
    title: 'Severity',
    dataIndex: 'vva_vulnerability_severity',
    editable: false,
     width:200,
    render: t => {
      
     
        return <SPRiskTag type="success" text={t} width={'80px'} />;
      
    },
  },
  {
    title: 'Attack Type',
    dataIndex: 'vva_vulnerability_attack_type',
    editable: false,
     width:200
  },

 

];


function Details({ singleOwnerAction, dashboardData,singleAssetAction, singleData, loading, assetDashboardAction, assetTypeSingleData, getAssetTypeByIdAction,singleOwnerData }) {


  const assetsDetails = [
    {
      label: 'Business Group',
      key: 'assetBusinessGroup',
      data:"dashboardData"
    },
    {
      label: 'Asset group',
      key: 'assetGroup',
      data:"dashboardData"
    },
    {
      label: 'Asset Subgroup',
      key: 'assetSubGroup',
      data:"dashboardData"
    },
    {
      label: 'Asset Type',
      key: 'ast_app_type',
      data: "assetTypes"
    },
    {
      label: 'Name',
      key: 'ast_name',
    },
    {
      label: 'Owner',
      key: 'ast_process_owner',
      data:'owner'
    },
    {
      label: 'NetBIOS Name',
      key: 'ast_netbios_name',
    },
  
  ];

  useEffect(() => {
    const id = location.pathname.split('/').pop();
    singleAssetAction(id);
    assetDashboardAction(id);
 
  }, []);

  useEffect(() => {
    if (singleData && Object.keys(singleData).length != 0) {
      if(singleData.data.ast_app_type !== null ){
        getAssetTypeByIdAction(singleData.data.ast_app_type);
      }
      if(singleData.data.ast_owner_id !== null ){
        singleOwnerAction(singleData.data.ast_owner_id)
      }
       
    }
  }, [singleData]);
 

  const history = useHistory();



  if (singleData && singleData.data) {
  
    
    let ast_name = singleData.data.ast_hostname+" / ";
    if(singleData.data.ast_hostname === ""){
      ast_name = singleData.data.ast_ip_address;
    }else{
      ast_name = ast_name+singleData.data.ast_ip_address;
    }
    return (
      <>
        <StyledDiv>
          <StyledButton
            onClick={() => {
              history.goBack();
            }}
          >
            <BackArrowOutline />
          </StyledButton>
          <StyledText>{ast_name}</StyledText>
        </StyledDiv>
        <DetailsTable items={assetsDetails} values={singleData.data} ast_s3_score={singleData.data.ast_s3_score} 
        assetTypeSingleData={assetTypeSingleData}
        singleOwnerData={singleOwnerData}
        dashboardData = {dashboardData}
        />
        
        { dashboardData  && dashboardData.data?.incidents.length > 0 &&
          <>
            <StyledText>Incidents</StyledText>
            <SPTable
              columns={columns}
              isLoading={loading}
              dataSource={dashboardData.data.incidents}
              totalRecords={3}
              headerBorderColor="#FFC542"
              noBottomPadding
              noTitle
            />
          </>
        }
      
        { dashboardData  &&  dashboardData.data?.advisories.length > 0 &&
        <>
          <StyledText>Threat Intel</StyledText>
          <SPTable
            columns={advisoriesCol}
            dataSource={dashboardData.data.advisories}
            totalRecords={3}
            isLoading={loading}
            headerBorderColor="#3DD598"
            noBottomPadding
            noTitle
          />
        </>
        }
        
        { dashboardData   && dashboardData.data?.risks.length > 0 &&
         <>
          <StyledText>Risks</StyledText>
          <SPTable
            columns={risksCol}
            dataSource={dashboardData.data.risks}
            totalRecords={3}
            isLoading={loading}
            headerBorderColor="#dc3545"
            noBottomPadding
            noTitle
          />
         </>
        }
      
        { dashboardData   && dashboardData.data?.vulnerabilities.length > 0 &&
        <>
          <StyledText>Vulnerabilities</StyledText>
        <SPTable
          columns={vulnerabilitiesCol}
          dataSource={dashboardData.data.vulnerabilities}
          totalRecords={3}
          isLoading={loading}
          headerBorderColor="#1E75FF"
          noBottomPadding
          noTitle
        />
         </>
      }
      </>
    );
  } else {
    return <div></div>;
  }
}
const mapStateToProps = state => {
  return {
    singleData: state.assetsStore.singleData,
    loading: state.assetsStore.loading,
    dashboardData: state.assetsStore.dashboardData,
    ownersData: state.ownersStore.listData,
    assetTypeSingleData: state.assetTypeStore.singleData,
    singleOwnerData: state.ownersStore.singleData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    singleAssetAction: data => {
      return dispatch(singleAsset(data));
    },
    assetDashboardAction:data => {
      return dispatch(assetDashboard(data));
    },
    getAssetTypeByIdAction:data => {
      return dispatch(getAssetTypeById(data));
    },
    singleOwnerAction:data => {
      return dispatch(singleOwner(data));
    }
    
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC
)(Details);

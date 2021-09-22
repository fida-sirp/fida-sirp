import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { getAssetTemplates,assetDraftTemplate } from '../../../../../actions/assets';
import SPButton from '../../../../../components/SPButton';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import FormHeader from '../../../incidentManagement/components/FormHeader';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import { AlertBox } from './StyledComponents';

const optionData = [
  { key: 1, value: 'ipv1', label: 'IPv1' },
  { key: 2, value: 'ipv2', label: 'IPv2' },
  { key: 3, value: 'ipv3', label: 'IPv3' },
  { key: 4, value: 'ipv4', label: 'IPv4' },
  { key: 5, value: 'ipv5', label: 'IPv5' },
  { key: 6, value: 'ipv6', label: 'IPv7' },
  { key: 7, value: 'ipv7', label: 'IPv8' },
  { key: 8, value: 'ipv8', label: 'IPv9' },
];

const OuterInput = styled.div`
  height: 715px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
  padding-top: 10px;
  padding-left: 20px;
  overflow-x: hidden;
`;



function Assets({ visible, onClose, onOpen,templateCode,template,getAssetTemplates,templateDraft,assetDraftTemplate }) {
    

  const fieldObject = [
    {
      name:'ast_asset_category',
      label:'Asset Category'
    },
    {
      name:'ast_name',
      label:'Name'
    },
    {
      name:'ast_make',
      label:'Make'
    },
    {
      name:'ast_model',
      label:'Model'
    },
    {
      name:'businessGroup',
      label:'Source'
    },
    {
      name:'ast_category',
      label:'Machine Category'
    },
    {
      name:'ast_serial_no',
      label:'Serial Number'
    },
    {
      name:'ast_location',
      label:'Location'
    },
    {
      name:'ast_location_desc',
      label:'Location Description'
    },
    {
      name:'ast_branch_code',
      label:'Branch Code'
    },
    {
      name:'ast_asset_value',
      label:'Asset Value'
    },
    {
      name:'ast_software_type',
      label:'Software Type'
    },
    {
      name:'ast_number_of_licenses',
      label:'Number of licenses'
    },
    {
      name:'ast_process_name',
      label:'Process Name'
    },
    {
      name:'ast_process_owner',
      label:'Process Owner'
    },
    {
      name:'ast_employee_number',
      label:'Employee Number'
    },
    {
      name:'ast_department_head',
      label:'Department Head'
    },
    {
      name:'ast_designation',
      label:'Designation'
    },
    {
      name:'ast_ip_address',
      label:'IP Address'
    },
    {
      name:'assetType',
      label:'Asset Type'
    },
    {
      name:'ast_hostname',
      label:'Hostname'
    },
    {
      name:'ast_netbios_name',
      label:'NetBIOS Name'
    },
    {
      name:'ast_owner_id',
      label:'Owner'
    },
    {
      name:'ast_custodian',
      label:'Custodian'
    },
    {
      name:'ast_external_ip_address',
      label:'External IP Address'
    },
    {
      name:'ast_classification',
      label:'Classification'
    },
    {
      name:'ast_server',
      label:'Server'
    },
    {
      name:'ast_os_id',
      label:'Operating System'
    },
    {
      name:'ast_sub_group',
      label:'Asset Sub Group'
    },
    {
      name:'ast_products',
      label:'Product'
    },
    {
      name:'ast_vendor',
      label:'Vendor'
    },
    {
      name:'ast_ip_type',
      label:'IP Type'
    },
    {
      name:'ast_description',
      label:'Description'
    },
    {
      name:'ast_mac_address',
      label:'MAC Address'
    },
    {
      name:'ast_dns',
      label:'DNS'
    },
    {
      name:'ast_group',
      label:'Asset Groups'
    },
    {
      name:'ast_siem',
      label:'Integrated with SIEM'
    },
    {
      name:'ast_zone',
      label:'Zone'
    },
    {
      name:'ast_email',
      label:'Email'
    },
    {
      name:'ast_server_type',
      label:'Server Type'
    },
    {
      name:'ast_power_status',
      label:'Power Status'
    },
    {
      name:'ast_system_type',
      label:'System Type'
    },
    {
      name:'ast_network_type',
      label:'Network Type'
    },
    {
      name:'ast_rack_number',
      label:'Rack Number'
    },
    {
      name:'ast_document_type',
      label:'Document Type'
    },
    {
      name:'ast_department',
      label:'Department / Team'
    },
    {
      name:'ast_database',
      label:'Database'
    },
    {
      name:'ast_administrator',
      label:'IT Administrator'
    },
    {
      name:'ast_organizational_unit',
      label:'Organizational Unit'
    },
    {
      name:'ast_nationality',
      label:'Nationality'
    },
    {
      name:'ast_supervisor_id',
      label:'Immediate Supervisor ID'
    },
    {
      name:'ast_supervisor_name',
      label:'Immediate Supervisor Name'
    },
    {
      name:'ast_employee_type',
      label:'Employee Type'
    },
    
    {
      name:'ast_slot_number',
      label:'Slot Number'
    },
    
    {
      name:'ast_status',
      label:'Status'
    },
    
    {
      name:'ast_remote_ap',
      label:'Remote AP'
    },
    
    {
      name:'ast_identifier',
      label:'Identifier'
    },
    {
      name:'ast_number_of_instances',
      label:'Number of Instances'
    },
    {
      name:'ast_current_version',
      label:'Current Version'
    },
    {
      name:'ast_key_user',
      label:'Key User'
    },
    {
      name:'ast_app_type',
      label:'App Type'
    },
    {
      name:'ast_installation',
      label:'Installation'
    },
    {
      name:'ast_account_expiration',
      label:'Account Expiration Date'
    },
    {
      name:'ast_function',
      label:'Function'
    },
    {
      name:'ast_memory',
      label:'Memory'
    },
    {
      name:'ast_tag',
      label:'IDF Tag'
    },
    {
      name:'ast_hosted',
      label:'Hosted'
    },
    {
      name:'ast_integrated',
      label:'Integrated with H+'
    } 
  ];

  let initialValues ={};
  fieldObject.forEach(function(entry) {
    initialValues = {...initialValues,[entry.name]:""}
  });
  const [error, setError] = useState("");

  return (
    <div style={{ marginBottom: 20 }}>
      <Formik
        id="formik"
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          let assets =  JSON.stringify(values);
    
           console.log(assets);
          if(template){
            assetDraftTemplate({Assets:assets,template:template})
          }else{
            setError("Template is required!")
          }
        
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue,
        }) => {

          useEffect(() => {
            resetForm();
            
                for (let [key, value] of Object.entries(templateCode)) {
                  if(Object.keys(initialValues).includes(key)){
                    setFieldValue(key, value, false);
                  }
                  
                }
  
           

      
        }, [templateCode]);


        useEffect(() => {
         if(templateDraft.isSuccess){
          getAssetTemplates()
         }

      }, [templateDraft.isSuccess]);

          return (
            <Form onSubmit={handleSubmit}>
              <FormHeader
                number={2}
                title="Assets"
                visible={visible}
                onOpen={onOpen}
                onClose={onClose}
              >
              {templateDraft?.data?.data?.result  ? (
                      
                      <AlertBox message={<ul className="margin-10">{templateDraft?.data?.data?.result}</ul>} type="success" closable />
                  
                  ) : null}
                   {error  ? (
                      
                      <AlertBox message={<ul className="margin-10">{error}</ul>} type="error" closable />
                  
                  ) : null}


              <OuterInput>


                  {fieldObject.map((item) => {     
                
                    return (
                      <InputBox
                      id={item.name}
                      label={item.label}
                      name={item.name}
                      placeholder=""
                      onInputChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={errors[item.name]}
                      value={values[item.name]}
                      touched={touched[item.name]}
                    />
                      ) 
                  })}
              </OuterInput>
               
      
                <Row gutter={11} justify="end">
                  <Col>
                    <SPButton title="Save"  htmlType="submit" size="small" />
                  </Col>
                </Row>
              </FormHeader>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}



const mapStateToProps = state => {
  return {
    templateDraft:state.templateDraft
  };
};

const mapDispatchToProps = {
  assetDraftTemplate,
  getAssetTemplates
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Assets);


import React from 'react';
import PropTypes from 'prop-types';
import { map, find, isArray } from 'lodash';
import {
  TagContainer,
  TagWrapper,
  StyledBox,
} from '../addMember/StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import IncidentTab from '../incidentTab';

function AddRelatedIncident({
  incidents,
  selectedIncidents,
  onAdd,
  onRemove,
  type = '',
}) {
  return (
    <StyledBox>
      <div style={{ width: 226 }}>
        <SPAddItemDropdown
          title={`Add Related ${type}s`}
          onSelect={({ key }) => onAdd(key)}
          items={
            isArray(incidents)
              ? incidents.map(i => {
                  return {
                    key: i.iti_id,
                    label: i?.iti_subject,
                    id: i?.iti_id,
                    priority: i?.iti_attack_severity,
                  };
                })
              : []
          }
          type="incident"
          searchSize="300px"
        />
      </div>
      <TagWrapper>
        <TagContainer>
          {map(selectedIncidents, incident => {
            return (
              <IncidentTab
                text={incident?.iti_subject}
                id={incident?.iti_id}
                priority={incident?.iti_attack_severity}
                onRemove={() => {
                  onRemove(incident?.iti_id);
                }}
              />
            );
          })}
        </TagContainer>
      </TagWrapper>
    </StyledBox>
  );
}

export default AddRelatedIncident;

AddRelatedIncident.propTypes = {
  incidents: PropTypes.array,
  selectedIncidents: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

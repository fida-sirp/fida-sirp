import React, { useState } from 'react';
import IncidentScoring from './Component/IncidentScoring';
import Categories from './Component/NcissCategories';
import Periorities from './Component/NcissPriorites';

const Nciss = ({access}) => {
    const [selectedView, setSelectedView] = useState('incident-scoring');

    const renderView = () => {

        if (access!==undefined && access.includes("index-ncis-options-mapping")  && selectedView === 'incident-scoring') {
            return <IncidentScoring access={access} onChangeView={setSelectedView} />;
        }else
        if (access!==undefined &&  access.includes("index-ncis-scoring-categories") && selectedView === 'categories') {
            return <Categories access={access} onChangeView={setSelectedView} />;
        }else
        if (access!==undefined &&  access.includes("index-ncis-periority-colors") && selectedView === 'periorities' ) {
            return <Periorities access={access} onChangeView={setSelectedView} />;
        }
    }
    return (
        <>
            {renderView()}
        </>
    );
};

export default Nciss;
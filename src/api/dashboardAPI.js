import axios from 'axios';
import API from '../config/endpoints.config';

export async function dashboardListAPI(expand = '') {
    // debugger;
    const userToken = localStorage.getItem('AccessToken');
    // let expand = '';
    // if (graphList) {
    //     expand = 'expand=isDraft,dashboardGraphs'
    // } else {
    //     expand = 'expand=isDraft,checkForDefault,checkForRemove,CheckForAdd'
    // }
    const api = `${API.dashboards}?expand=${expand}`;
    const response = await axios.get(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardList() {
    const userToken = localStorage.getItem('AccessToken');
    const api = `${API.dashboards}/dashboard-list`;
    const response = await axios.get(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}


export async function dashboardCreateAPI(payload) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}`;
    const response = await axios.post(api, payload, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardUpdateAPI(id, payload) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}/${id}`;
    const response = await axios.put(api, payload, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}


export async function dashboardGetWidgetDataAPI(payload) {
    const data = {
        start: payload.start,
        end: payload.end
    }
    const userToken = localStorage.getItem('AccessToken');
    // debugger;
    const api = `${API.dashboards}/render-view?name=${payload.dataPath}`;
    const response = await axios.post(api, data, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}


export async function dashboardRemoveAPI(id) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}/remove-dashboard?id=${id}`;
    const response = await axios.delete(api, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardDeleteAPI(id) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}/${id}`;
    const response = await axios.delete(api, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardAddAPI(id) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}/add-dashboard?id=${id}`;
    const response = await axios.get(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardSetDefaultAPI(id) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}/default-dashboard?id=${id}`;
    const response = await axios.get(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}


export async function dashboardGetWidgetList(queryItems) {
     
    const userToken = localStorage.getItem('AccessToken');
    let api = '';
    if(queryItems){
        api = `${API.dashboards}/all-widget-list?expand=graGroup,dataPath${queryItems}`;
    }else{
        api = `${API.dashboards}/all-widget-list?expand=graGroup,dataPath`;
    }
    const response = await axios.get(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

// export async function dashboardGetWidgetDataAPI(datapath){

//     const userToken = localStorage.getItem('AccessToken');
//     const expand = `gsuGraph.graGroup,gsuGraph.dataPath`
//     const api = `${API.dashboards}/widget-list?expand=${expand}`;
//     const response = await axios.get(api, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + userToken,
//         },
//     });
//     return response.data;
// }

export async function dashboardWidgetGetGroupList() {
    const userToken = localStorage.getItem('AccessToken');
    const api = `${API.dashboards}/group`;
    const response = await axios.get(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function getDashboardByIdAPI(payload) {
    const userToken = localStorage.getItem('AccessToken');
    const expand = `start=${payload?.start}&end=${payload?.end}&expand=isDraft,dashboardGraphs.gsuGraph.data`;
    const response = await axios.get(`${API.dashboards}/${payload?.id}?${expand}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardAddWidget(payload) {
    // debugger;
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${API.dashboards}/add-widgets`, payload, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });

    return response.data;
}

export async function dashboardDeleteWidget(id) {
    const userToken = localStorage.getItem('AccessToken');
    const api = `${API.dashboards}/remove-widget?id=${id}`;
    const response = await axios.delete(api, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}

export async function dashboardUpdateWidget(payload) {
    const userToken = localStorage.getItem('AccessToken');

    const api = `${API.dashboards}/map-widgets`;
    const response = await axios.post(api, payload, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        },
    });
    return response.data;
}
import React, { useEffect } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
// import 'jsoneditor-react/es/editor.min.css';

import map from 'lodash/map';
import routes from './route';
import SPActivityIndicator from '../components/SPActivityIndicator';
import LayoutContainer from './layout';
import Colors from '../theme/Colors';
import SPAlertBox from '../components/SPAlertBox';
import '../utils/custom_utils';

function App() {
  // cache images before use
  const cacheImages = async images => {
    const promises = await images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve(src);
        img.onerror = reject();
      });
    });
    await Promise.all(promises);
  };

  useEffect(() => {
    const svgElements = [
      '/images/create-playbook/action.svg',
      '/images/create-playbook/filter.svg',
      '/images/create-playbook/sirp.svg',
      '/images/create-playbook/branch.svg',
      '/images/create-playbook/action-green.svg',
      '/images/create-playbook/filter-green.svg',
      '/images/create-playbook/sirp-green.svg',
      '/images/create-playbook/branch-green.svg',
      '/images/create-playbook/delete.svg',
      '/images/create-playbook/zoom_in.svg',
      '/images/create-playbook/zoom_out.svg',
      '/images/create-playbook/open_in_full.svg',
      '/images/create-playbook/start.svg',
      '/images/create-playbook/end.svg',
    ];
    cacheImages(svgElements);
    setInterval(() => {
          let alt_emements = document.getElementsByClassName("ant-alert-close-icon");
        if(alt_emements.length >0 ){
          for (var i = alt_emements.length - 1; i >= 0; i--) {
            if(alt_emements[i].hasAttribute("data-ck")){
              alt_emements[i].setAttribute("data-ck", parseInt(alt_emements[i].getAttribute("data-ck"))+1);
              if(alt_emements[i].getAttribute("data-ck") >=15 ){
                alt_emements[i].click()
              }
            }else{
              alt_emements[i].setAttribute("data-ck", 0);
            }

          }
          // let alert_element = document.getElementsByClassName("ant-alert-close-icon")[0]
          // console.log("alert_element",alert_element);
          // alert_element.click();
        }
    }, 1000);
  }, []);

  return (
    <div
      style={{ backgroundColor: Colors.backgroundSmokeBlack, height: '100vh' }}
    >
      <SPActivityIndicator />
      <LayoutContainer>
        <SPAlertBox />

        {map(routes, route => {
          return (
            <Route
              path={route.path}
              key={route.key}
              exact={route.exact}
              render={route.component}
            />
          );
        })}
      </LayoutContainer>
    </div>
  );
}

export default App;

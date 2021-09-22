import React, { useEffect, useState } from 'react';
import filter from 'lodash/filter';
import {
  ListStyle,
  ListLabelStyle,
  RightOutlinedStyle,
  AdministrationTabContainer,
  administrationTabDetailsTable,
} from './StyledComponents';

const AdministrationTab = ({ tabsData, defaultSelectedSubTab, onTabClick }) => {
  const [
    selectedSubTabDetailsContent,
    setSelectedSubTabDetailsContent,
  ] = useState(<React.Ftagment />);

  useEffect(() => {
    setSelectedTabComponent(defaultSelectedSubTab);
  }, []);

  const setSelectedTabComponent = defaultSelectedSubTab => {
    const data = filter(tabsData, td => td.key === defaultSelectedSubTab);
    const tabData = data && data.length > 0 ? data[0] : <React.Ftagment />;
    setSelectedSubTabDetailsContent(tabData);
  };

  const tabClickHandler = item => {
    setSelectedTabComponent(item?.key);
    onTabClick && onTabClick(item);
  };

  return (
    <AdministrationTabContainer>
      <div>
        <ListStyle
          dataSource={tabsData}
          renderItem={item => {
            return (
              <ListStyle.Item onClick={() => tabClickHandler(item)}>
                <ListLabelStyle
                  selectedItem={item?.key}
                  selectedSubTab={selectedSubTabDetailsContent?.key}
                >
                  {item?.title}
                </ListLabelStyle>
                <RightOutlinedStyle />
              </ListStyle.Item>
            );
          }}
        />
      </div>
      <div style={{ width: '100%', margin: 20 }}>
        <administrationTabDetailsTable>
          {selectedSubTabDetailsContent?.component}
        </administrationTabDetailsTable>
      </div>
    </AdministrationTabContainer>
  );
};

export default AdministrationTab;

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Col } from 'antd';
import { userLogout } from '../../../actions/auth';
import { getUserProfile } from '../../../actions/user';
import SPDrawer from '../../../components/SPDrawer';
import ProfileForm from './components/ProfileForm';
import {
  StyledDiv,
  StyledLayout,
  StyledCol,
  StyledText,
  StyledRow,
} from './StyledComponents';
import NotificationLogo from '../../../assets/svgIcon/header/notification';
import ProfileLogo from '../../../assets/svgIcon/header/profile';
import HelpLogo from '../../../assets/svgIcon/header/help';
import Logo from '../../../assets/images/logo.png';
import { useLocation } from 'react-router-dom'

function HeaderContainer({ userLogoutAction, onGetUserProfile }) {
  const location = useLocation()
  const history = useHistory();
  const [isProfileDrawerVisible, setIsProfileDrawerVisible] = useState(false);
  const onProfileDrawerOpen = () => {
    setIsProfileDrawerVisible(true);
  };
  const onProfileDrawerClose = () => {
    setIsProfileDrawerVisible(false);
  };

  const gotoHelp = () => {
    history.push('/help');
  }

  useEffect(() => {
    onGetUserProfile(location?.pathname === "/dashboard");
  }, []);

  useEffect(() => {
    const isLoggedOut = localStorage.getItem('Logout');
    if (isLoggedOut !== null) {
      localStorage.removeItem('Logout');
      localStorage.removeItem('AccessToken');
      history.replace('/login');
    }
  });

  return (
    <StyledLayout>
      <span>
        <img src={Logo} alt="" width="84" height="26" />
      </span>

      <StyledRow gutter={30}>
      {/*  <StyledCol key="Notification">
          <StyledDiv>
            <NotificationLogo />

            <StyledText>Notification</StyledText>
          </StyledDiv>
        </StyledCol>*/}
        <StyledCol
          key="Profile"
          role="presentation"
          onClick={onProfileDrawerOpen}
        >
          <StyledDiv>
            <ProfileLogo />
            <StyledText>Profile</StyledText>
          </StyledDiv>
        </StyledCol>
      {/*  <StyledCol key="Help" onClick={gotoHelp}>
          <StyledDiv>
            <HelpLogo />

            <StyledText> Help</StyledText>
          </StyledDiv>
        </StyledCol>*/}
        <StyledCol key="LogOut" onClick={userLogoutAction}>
          Log Out
        </StyledCol>
      </StyledRow>
      <SPDrawer
        title="Profile"
        isVisible={isProfileDrawerVisible}
        onClose={onProfileDrawerClose}
        drawerWidth={800}
      >
        <ProfileForm onClose={onProfileDrawerClose} />
      </SPDrawer>
    </StyledLayout>
  );
}

const mapStateToProps = state => {
  return {
    loginStore: state.loginStore,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogoutAction: data => {
      return dispatch(userLogout(data));
    },
    onGetUserProfile: (payload) => {
      return dispatch(getUserProfile(payload));
    },
    // onGetUserProfile: () => dispatch(getUserProfile)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

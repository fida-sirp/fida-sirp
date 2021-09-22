import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { googleLogin } from '../../../actions/auth';
import {
      Container,
      Content,
      LogoImage,
      SpinnerContainer,
    } from './StyledComponents';
import Logo from '../../../assets/images/logo.png';
import Colors from '../../../theme/Colors';
import loaderImg from '../../../assets/images/loader.gif';



const GoogleCallBack = ({googleLoginAction,googleLoginStore}) => {
      const history = useHistory();

      const [query, setQuery] = useState(location.search);
      
      let apiData = queryString.parse(query)
      useEffect(() => {
            googleLoginAction(apiData);
      }, apiData?.code);

      useEffect(() => {
            if(googleLoginStore.error){
                  history.push('/login');
            }
            
          }, [googleLoginStore.error]);
        
      useEffect(() => {
      if (googleLoginStore.isSuccess) {
       
            const accessToken = localStorage.getItem('AccessToken');
            
            if (accessToken !== null) {
           
          
            history.push('/dashboard');
           
            }
      }
      }, [googleLoginStore.isSuccess]);

          
      return (
            <Container>
            <Content>
              <LogoImage src={Logo} />
              <SpinnerContainer>
                <img src={loaderImg} alt="Loader" />
              </SpinnerContainer>
            </Content>
          </Container>
      );
};


const mapStateToProps = state => {
      return {
            googleLoginStore: state.googleLoginStore,
      };
    };



const mapDispatchToProps = dispatch => {
      return {
      googleLoginAction: data => {
          return dispatch(googleLogin(data));
        },
      };
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleCallBack);

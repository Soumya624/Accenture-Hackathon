import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";

import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link ,Redirect} from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from './Hero';
import GlobalState from "../../contexts/globalstate"
import Globalemail from '../../contexts/globalemail';
console.log(`${x}`);

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const { t } = useTranslation();

  const sectionHeader = {
    title: '',
    paragraph: '-'
  };

  
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [donortoken,setDonorToken]=useState('')
  const [redirect,setRedirect]=useState(false)
  //const [donortoken,setDonorToken]=useContext(GlobalState)

  const [token,setToken]=useContext(GlobalState)
  const [email,setEmail]=useContext(Globalemail)
  

  const handleuser = (e)=>{
    setUserName(e.target.value)
  }
  const handlepassword=(e)=>{
    setPassword(e.target.value)
  }
  const handlelogin=(e)=>{
    e.preventDefault()
    //console.log(userName)
    //console.log(password)
    
    axios.get('/donorLogin', {
      headers : {
          email:userName,
          password:password
      }
    }).then((response) => {
          //console.log(response.data)
          setDonorToken(response.data)
          setToken(response.data.token)
          setEmail(userName)
          setRedirect(true)
              
      })
      
      .catch((err)=>{
        alert('password or username incorrect')
      })
    
  } 
  if (redirect){
    return (<Redirect to={{pathname:"/Dashboard1_Donor",state:{donortoken:donortoken,email:userName}}} />)
  }
  else{
  return (
    
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content">
            <h2>{t('key24')}</h2>
          </SectionHeader>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                <p className="m-0">
                  <form onSubmit={handlelogin}>
                    <Input  onChange={handleuser} id="newsletter" type="email" value={userName} hasIcon="right" placeholder="Your Username" name="username" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <Input  onChange={handlepassword} id="newsletter" type="password"  value={password} hasIcon="right" placeholder="Your Password" name="password" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <center>
                      <br />
                      <div className="row">
                        <div className="columnl">
                          <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #3d946e", color: "#3d946e", width: "95%" }}>Google</Link>
                        </div>
                        <div className="columnl">
                          <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #3d946e", color: "#3d946e", width: "95%" }}>Instagram</Link>
                        </div>
                        <div className="columnl">
                          <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #3d946e", color: "#3d946e", width: "95%" }}>Facebook</Link>
                        </div>
                      </div>
                    </center>
                    <br />
                    <center>
                      <button type="submit" className="button button-primary button-wide-mobile button-sm"  style={{ backgroundColor: "#3d946e", borderRadius: "20px" }}>Login</button>
          
                      <br /><br />{t('key30')} <a href="/Signup_Donor">{t('key27')}</a>
                    </center>
                  </form>
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/eDOPT.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
                }
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
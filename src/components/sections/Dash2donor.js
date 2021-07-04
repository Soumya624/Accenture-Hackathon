import {useState, useEffect,useContext} from 'react';
import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link ,Redirect} from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import axios from "../../api/axios";


import GlobalState from "../../contexts/globalstate"
import Globalemail from '../../contexts/globalemail';
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

  const sectionHeader = {
    title: '',
    paragraph: ''
  };

  
    

//const [donorToken,setDonorToken]=useState(props.location.state.donortoken)
const [donorData,setDonorData]=useState('') 
const [donorStudents,setDonorStudents]=useState([])
//const [email,setEmail]=useState(props.location.state.email)


const [token,setToken]=useContext(GlobalState)
const [email,setEmail]=useContext(Globalemail)
const [redirecthome,setRedirectHome]=useState(false)

console.log(token)
useEffect(() => {
    axios.get('/donorDashboard', {
        headers : {
            email:email,
            authorization: token
        }
    }).then((response) => {
            //console.log(response.data)
            setDonorData(response.data)
        })
        .catch((err)=>{
          setRedirectHome(true)
        })
}, []);



useEffect(() => {
  axios.get('/adoptedStudents', {
      headers : {
        email:email,
        authorization: token
      }
  }).then((response) => {
          //console.log(response.data)
          setDonorStudents(response.data)
      }).catch((err)=>{
        setRedirectHome(true)
      })
}, []);
if (redirecthome){
  return(<Redirect to={{pathname:"/Login_Donor",state:{}}} />)
}
else{

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <p className="m-0" style={{alignItems:"center"}}>
                  <a href="/Feed_Donor" style={{color:"#3d946e", fontSize:"14px", margin:"0rem"}}>Adopt More</a>
                  <br/>
                  {donorStudents.map((student,index)=>{
                    return (
                        <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1%"}}>
                                    <img src={student.photo} alt="" style={{width:"70%"}}/>
                                    <br/>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        {student.name}
                                    </p>
                                    <br/>
                                    <br/>
                                    <Link to={{pathname:"/Dashboard3_Donor",state:{demail:email ,semail:student.email,donordata:donorData,student:student}}} className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Show More</Link>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        
                                            Age : {student.age}<br/>
                                            Gender : {student.gender}<br/>
                                            City : {student.city}<br/>
                                            Phone No : {student.phone}<br/>
                                            Class : {student.grade}th<br/>
                                        
                                    </p>
                                </div>
                        </div>
                    </div>

                    )
                  })}
                    
                    
                    
                </p>
              </div>
              <div className='split-item-image center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <center>
                    <a href="#" style={{color:"grey", fontSize:"14px", margin:"0.5rem"}}>Recent Notification</a>
                        <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%", width:"80%"}}>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                </center>
                </p>
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
import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import { Link,Redirect } from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import GlobalState from "../../contexts/globalstate"
import Globalemail from '../../contexts/globalemail';
const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  alignTop,
  invertMobile,
  invertDesktop,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: '',
    paragraph: ''
  };

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );


  



const [token,setToken]=useContext(GlobalState)

const [email,setEmail]=useContext(Globalemail)
const [donorToken,setDonorToken]=useState('bearer'+' '+ token)
const [donorData,setDonorData]=useState('') 
const [donorStudents,setDonorStudents]=useState([])
//const [email1,setEmail1]=useState(props.location.state.email)
const [redirecthome,setRedirectHome]=useState(false)

useEffect(() => {
    axios.get('/donorDashboard', {
        headers : {
            email:email,
            authorization: donorToken
        }
    }).then((response) => {
            //console.log(response.data)
            //console.log(donorToken)
            setDonorData(response.data)
            setToken(donorToken)

        }).catch((err)=>{
          setRedirectHome(true)
        })
}, []);



useEffect(() => {
  axios.get('/adoptedStudents', {
      headers : {
        email:email,
        authorization: donorToken
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
          <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" >
                {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                <p className="m-0">
                  <div className="row">
                      <div className="column">
                        <a href="#" style={{textDecoration:"none", color:"black", marginRight:"3%"}}>eDOPTED</a>  {donorStudents.length}
                      </div>
                      <div className="column">
                      <Link to={{pathname:"/Dashboard2_Donor",state:{donortoken:donorToken,donorData:donorData, email:email}}} className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Show More</Link>
                      </div>
                  </div>
                  <br/>
                  {donorStudents.map((student,index)=>{
                    return (<div>
                      {index+1}. {student.name}
                  </div>)
                  })}

                  <br/>
                  <a href="/Feed_Donor" style={{color:"#3d946e", fontSize:"14px"}}>Adopt More</a>
                </p>
              </div>
              <div className='split-item-image center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <div className="row">
                      <div className="column">
                      &#169; Ace<br/>
                        435353456 <a href="#" style={{color:"#3d946e", fontSize:"12px", marginLeft:"5px"}}>T&C</a>
                      </div>
                      <div className="column">
                      <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Gain More</Link>
                      </div>
                    </div>
                    <br/>
                    <div style={{marginBottom:"0.5%"}}>
                        Show Your Karma
                    </div>
                    <div style={{fontSize:"14px"}}>
                        Share On
                    </div>
                    <FooterSocial/>
                </p>
              </div>
          </div>
          </div>


          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom" style={{backgroundColor:"#ffffff", borderRadius:"0", margin:"1%"}}>
              <div className="tiles-item-inner" style={{backgroundColor:"white", borderRadius:"0", border:"1px solid #3d946e"}}>
                <div>
                <center>
                <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" style={{width:"2rem", textAlign:"center"}}/>
                </center>
                <h2 style={{margin:"0", color:"black", fontSize:"25px", textAlign:"center"}}>{donorData.name}</h2>
                <br/>
                <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                  City : {donorData.city}<br></br>
                  Pin Code: {donorData.pin}<br></br>
                  Phone no.: {donorData.phone}<br></br>
                </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
}
  
Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
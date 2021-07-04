import React, {useState} from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link } from 'react-router-dom';
import Modal from '../elements/Modal';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker'

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

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const sectionHeader = {
    title: '',
    paragraph: ''
  };
  alert("Login to Schedule a Meeting!")
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
                  <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src={require('./../../assets/images/i3.jpg')} alt="" style={{width:"70%"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                        
                                    </p>
                                    <br/>
                                    <br/>
                                    <center>
                                    <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Call</Link>
                                    </center>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        I need financial assistance to complete my school. I am a topper of my class. Everyone loves me because of my polite nature. Now things have changed, we have no resource to complete my schooling. I am looking for my virtual parent here who will take care of my studies. I will prove myself and will forever be grateful to person who will help me.
                                    </p>
                                </div>
                        </div>
                    </div>
                    {/* <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" style={{width:"2rem"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                        Name
                                    </p>
                                    <br/>
                                    <br/>
                                    <center>
                                    <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Call</Link>
                                    </center>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.
                                    </p>
                                </div>
                        </div>
                    </div> */}
                </p>
              </div>
              <div className='split-item-image center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <center>
                    <a href="#" style={{color:"grey", fontSize:"14px", margin:"0.5rem"}}>Schedule a Meeting</a>
                        <div style={{border:"1px solid #3d946e", padding:"9%", margin:"4% 0%", width:"80%"}}>
                            <Calendar/>
                            <br/><br/>
                            <TimePicker />
                            <br/><br/>
                            <a href="#" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", margin:"1%", borderRadius:"20px"}}>Meet Now</a>
                            <a href="/Terms" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", margin:"1%", borderRadius:"20px"}}>Go Ahead</a>
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

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
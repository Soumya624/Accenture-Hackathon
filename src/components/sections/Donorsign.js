import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link } from 'react-router-dom';
import './style.css'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from './Hero';
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

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content">
            <h2>{t('key23')}</h2>
          </SectionHeader>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                <p className="m-0">
                  <form>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Name" name="name" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    {/* <div className="row" style={{marginTop:"2%"}}>
                    <div className="column" style={{paddingRight:"1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Age" name="age" style={{marginTop:"4%", borderRadius:"20px", borderColor:"grey"}}>  
                    </Input>
                    </div>
                    <div className="column" style={{paddingLeft:"1%"}}>
                    <Input id="newsletter" type="gender" hasIcon="right" placeholder="Your Gender" name="gender" style={{marginTop:"4%", borderRadius:"20px", borderColor:"grey"}}>  
                    </Input>
                    </div>
                  </div> */}
                    <div className="row" style={{ marginTop: "2%" }}>
                      <div className="column" style={{ paddingRight: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right" placeholder="Your City" name="city" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                        </Input>
                      </div>
                      <div className="column" style={{ paddingLeft: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Pincode" name="pin" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                        </Input>
                      </div>
                    </div>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Phone" name="phone" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    {/* <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Company" name="company" style={{marginTop:"4%", borderRadius:"20px", borderColor:"grey"}}>  
                  </Input> */}
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
                      <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#3d946e", borderRadius: "20px" }}>Signup</Link>
                      <br /><br />{t('key29')} <a href="/Login_Donor">{t('key28')}</a>
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

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
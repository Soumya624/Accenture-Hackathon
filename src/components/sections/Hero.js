import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import botSrc from '../../assets/images/chat.png'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Modal from '../elements/Modal';
import SectionHeader from './partials/SectionHeader';
import './style.css';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
var cariable = prompt("Choose Language (English/Hindi). Press OK to Continue with English");
export const x= cariable;
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      English: {
        translation: {
        }
      },
      Hindi: {
        translation: {
        }
      }
    },
    lng: x,
    fallbackLng: 'English',

    interpolation: {
      escapeValue: false
    }
  });


const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const Hero = ({
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
  refCta,
  ...props
}) => {


  console.log(refCta)
  const [videoModalActive, setVideomodalactive] = useState(false);

  React.useEffect(()=>{
    document.addEventListener("click",(e)=>{
      //sc-kEqXSa bNIVFd rsc-content
      // sc-eCApnc drnjow rsc-os-options
      // sc-jrsJWt KSLfZ rsc-container
      // console.log(e.target.parentNode.parentNode.className.indexOf("sc") === -1)
      // console.log(e.target.className === "botClassName")


       if((e.target.parentNode)){
        if(e.target.parentNode.parentNode.className.indexOf("sc") !== -1 || e.target.className === "botClassName" ){
            // continue;
        }
      else{
        setFlag(false)
      }}
    });
  })

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const { t } = useTranslation();

  const innerClasses = classNames(
    'hero-inner section-inner',
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
  function RedirectPage(){
    console.log(refCta)
    if(refCta.current !== null){
      console.log('Hello')
      refCta.current.scrollIntoView(
        {
          behavior: "smooth", 
        }
      )
    }

    setTimeout(function(){
      setFlag(false)
    },1000)

    return <p style={{fontSize:"18px",color:"#3d946e",textAlign:"center",}}>You are redirecting to our Email Submission Tab.</p>
  }

  const steps=[
    {
      id: '1',
      message: 'Hi, I am the bot of the website',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Hello', trigger: '3' },
      ],
    },
    {
      id: '3',
      message: 'Good to see you.',
      trigger: '4',
    },
    {
      id: '4',
      message: 'Do you want to know about us?',
      trigger: '5',
    },
    {
      id: '5',
      options: [
        { value: 1, label: 'Yes', trigger: '8' },
        { value: 2, label: 'No', trigger: '6' },
      ],
    },
    {
      id: '6',
      message: 'Do you have any question?',
      trigger:'7',
    },
    {
      id: '7',
      options: [
        { value: 1, label: 'Yes', trigger: '10' },
        { value: 2, label: 'No', trigger: '9' },
      ],
    },
    {
      id: '9',
      message: 'Bye!',
      end: true
    },
    {
      id: '8',
      message:"We are a creating where people can donate money to help economically backward people.",
      trigger:'6'
    },
    {
      id: '10',
      component:<RedirectPage/>,
      end: true
    }
  ]

  const [flag,setFlag] = React.useState(false);

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#3d946e',
    headerFontColor: '#fff',
    headerFontSize: '18px',
    botBubbleColor: '#3d946e',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const botRef = React.useRef(null);
  return (
    <section
      {...props}
      className={outerClasses}
    >
    <div ref={botRef} className="botClassName" onClick={()=>{
      console.log(botRef);
    }}>
    <div style={{position:"fixed", bottom:"0",right:"0", zIndex:"1000",width:"75px"}}>
      <Button style={{width:"110px",background:"none",position:"relative",animation:"animBot ease-in-out 2s"}} onClick={()=>{
        setFlag(!flag);
      }}>
        <img style={{width:"40vw"}} className="botClassName"  src={botSrc}/>
      <div style={{position:"relative",right:"43px",bottom:"24px",animation:"fadeMe 6s",color:"#3d946e"}}>
        Hello
      </div>
      </Button>
    </div>
    <div style={{position:"fixed",bottom:"10vh",right:"0",zIndex:"100000", display:flag ? "block":"none"}}>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} style={{textAlign:"left", fontFamily:"sans-serif"}}/>
      </ThemeProvider>
    </div>
    </div>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
              <div className="container-xs">
                    <div style={{textAlign:"left", marginTop:"2%", marginLeft:"1%"}}>
                    <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{color:"black", marginBottom:"0"}}>
                      {t('key1')} <span className="text-color-primary" style={{color:"#3d946e"}}>{t('key')}!</span>
                    </h1>
                      <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400" style={{marginTop:"0px", paddingTop:"0px"}}>
                        {t('key2')}
                      </p>
                    </div>
                  <div className="reveal-from-bottom" data-reveal-delay="600">
                    <ButtonGroup>
                      <Button tag="a" color="primary" wideMobile href="/Signup_Donor" style={{backgroundColor:"#3d946e"}}>
                        {t('key7')}
                        </Button>
                      <Button tag="a" color="dark" wideMobile href="/Signup_Student" style={{backgroundColor:"#3d946e"}}>
                        {t('key8')}
                      </Button>
                    </ButtonGroup>
                    <div style={{textAlign:"right", marginTop:"2%"}}>
                      <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{color:"black", marginBottom:"0"}}>
                        {t('key8')}?
                      </h1>
                      <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400" style={{marginTop:"0px", paddingTop:"0px"}}>
                        {t('key9')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <img src="childrenRun.png" alt="" style={{width:"90%"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;

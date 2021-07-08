import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import botStc from '../../assets/images/chat.png'
import i18n from "i18next";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from "./Hero";
import Button from "../elements/Button";
console.log(`${x}`)

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  const outerClasses = classNames(
    "cta section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split"
  );

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#3d946e',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3d946e',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };
// const steps = [
//     {
//       id: '0',
//       message: 'Hi, I am Ltob.',
//       trigger: '1',
//     },
//     {
//       id: '1',
//       message: 'Do you have any problem',
//       trigger: '1',
//     },
//     {
//       id: '2',
//       user: true,
//       trigger: '3',
//     },
//     {
//         id: '3',
//         message: 'Alright Our Team Will Reach Out. You Can Even Call Us on +91-1234567890!',
//         trigger: '1',
//       },
//   ];

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
    trigger: '2',
  },
]

  const { t } = useTranslation();

  const [_email, setEM] = React.useState("");
  const [flag, setFlag]  = React.useState(false)
 
  return (
    <section {...props} className={outerClasses}>
      {/* <center> */}
        {/* <p className="m-0">{t("key34")} */}
        {/* <div style={{position:"fixed", bottom:"0",right:"0"}}>
          <Button style={{width:"100px",background:"none"}}>
            <img style={{width:"100%"}}  src={botStc}/>
          </Button>
        </div> */}
        {/* <Button
          onClick={()=> {
            setFlag(!flag)
          }}
          className="button button-primary button-wide-mobile button-sm"
          style={{
            backgroundColor: "#3d946e",
            borderRadius: "20px",
            marginLeft: "1%",
          }}
        >
          {t("key35")}
        </Button></p>
        <br/><br/>
        <div style={{position:"relative"}}>
            <ThemeProvider theme={theme}>
                <ChatBot steps={steps} style={{textAlign:"left", display: flag===true ? "block":"none", fontFamily:"sans-serif"}}/>
            </ThemeProvider>
        </div>
      </center><br/><br/> */}
      <div className="container" style={{ backgroundColor: "#3d946e" }}>
        <div className={innerClasses} style={{ backgroundColor: "#3d946e" }}>
          <div className="cta-slogan">
            <h3 className="m-0">
              <b>{t("key22")}</b>
            </h3>
          </div>
          <div className="cta-action">
            <Input
              id="newsletter"
              type="email"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              placeholder="Enter Your Email"
              name="newsletter"
              onChange={(e) => setEM(e.target.value)}
            >
              <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                  fill="#376DF9"
                />
              </svg>
            </Input>
          </div>
        </div>
      </div>
    </section>
  );
};

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;

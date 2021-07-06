import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from "./Hero";
console.log(`${x}`);

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

  const { t } = useTranslation();

  const [_email, setEM] = React.useState("");

  return (
    <section {...props} className={outerClasses}>
      <center>
        <p className="m-0">{t("key34")}
        <a
          href="#"
          className="button button-primary button-wide-mobile button-sm"
          style={{
            backgroundColor: "#3d946e",
            borderRadius: "20px",
            marginLeft: "1%",
          }}
        >
          {t("key35")}
        </a></p>
      </center><br/><br/>

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

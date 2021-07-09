import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from "./Hero";
import Input from "../elements/Input";
import Button from "../elements/Button";
console.log(`${x}`);

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const { t } = useTranslation();
  const [flag, setFlag] = React.useState(false);

  const sectionHeader = {
    title: "",
    paragraph:
      "We let you know how your donation money is used in the welfare of children and helps you build a personal connection",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content">
            <h2 style={{ color: "rgb(61, 148, 110)" }}>{t("key20")}</h2>
            {/* <p>{t('key21')}</p> */}
          </SectionHeader>
          <div className={tilesClasses}>
            <div
              className="tiles-item reveal-from-right"
              data-reveal-delay="200"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "25px",
                margin: "1%",
              }}
            >
              <div
                className="tiles-item-inner"
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  border: "1px solid #3d946e",
                }}
              >
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum cillum dolore eu fugiat.
                  </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span
                    className="testimonial-item-name text-color-high"
                    style={{ color: "rgb(61 148 110 / 50%)" }}
                  >
                    Roman Level
                  </span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a href="#0">Demo</a>
                  </span>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "25px",
                margin: "1%",
              }}
            >
              <div
                className="tiles-item-inner"
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  border: "1px solid #3d946e",
                }}
              >
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum cillum dolore eu fugiat.
                  </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span
                    className="testimonial-item-name text-color-high"
                    style={{ color: "rgb(61 148 110 / 50%)" }}
                  >
                    Diana Rynzhuk
                  </span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a href="#0">Demo</a>
                  </span>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-left"
              data-reveal-delay="200"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "25px",
                margin: "1%",
              }}
            >
              <div
                className="tiles-item-inner"
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  border: "1px solid #3d946e",
                }}
              >
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum cillum dolore eu fugiat.
                  </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span
                    className="testimonial-item-name text-color-high"
                    style={{ color: "rgb(61 148 110 / 50%)" }}
                  >
                    Ben Stafford
                  </span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a href="#0">Demo</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="center-content-mobile" style={{margin:"0 5%"}}>
          <center>
          <p className="m-0">
          {t("key34")}
          <Button
            onClick={() => {
              console.log(flag);
              setFlag(!flag);

              console.log(flag);
            }}
            className="button button-primary button-wide-mobile button-sm"
            style={{
              backgroundColor: "#3d946e",
              borderRadius: "20px",
              marginLeft: "1%",
            }}
          >
            {t("key35")}
          </Button>
        </p>
            <form style={{display: flag === true ? "block" : "none"}}>
              <br/>
              <Input
                id="newsletter"
                type="name"
                hasIcon="right"
                placeholder="Your Name"
                name="name"
                style={{
                  marginTop: "1%",
                  borderRadius: "20px",
                  borderColor: "grey",
                }}
              ></Input>
              <Input
                id="newsletter"
                type="name"
                hasIcon="right"
                placeholder="Event Name"
                name="event"
                style={{
                  marginTop: "1%",
                  borderRadius: "20px",
                  borderColor: "grey",
                }}
              ></Input>
              <div className="row" style={{ marginTop: "0.5%" }}>
                <div className="column" style={{ paddingRight: "1%" }}>
                  <Input
                    id="newsletter"
                    type="name"
                    hasIcon="right"
                    placeholder="Minimum Milestone"
                    name="min"
                    style={{
                      marginTop: "1%",
                      borderRadius: "20px",
                      borderColor: "grey",
                    }}
                  ></Input>
                </div>
                <div className="column" style={{ paddingLeft: "1%" }}>
                  <Input
                    id="newsletter"
                    type="gender"
                    hasIcon="right"
                    placeholder="Maximum Milestone"
                    name="max"
                    style={{
                      marginTop: "1%",
                      borderRadius: "20px",
                      borderColor: "grey",
                    }}
                  ></Input>
                </div>
              </div>
              <div className="row" style={{ marginTop: "0.5%" }}>
                <div className="column" style={{ paddingRight: "1%" }}>
                  <Input
                    id="newsletter"
                    type="name"
                    hasIcon="right"
                    placeholder="Starting Date"
                    name="start"
                    style={{
                      marginTop: "1%",
                      borderRadius: "20px",
                      borderColor: "grey",
                    }}
                  ></Input>
                </div>
                <div className="column" style={{ paddingLeft: "1%" }}>
                  <Input
                    id="newsletter"
                    type="name"
                    hasIcon="right"
                    placeholder="Ending Date"
                    name="end"
                    style={{
                      marginTop: "1%",
                      borderRadius: "20px",
                      borderColor: "grey",
                    }}
                  ></Input>
                </div>
              </div>
              <Input
                id="newsletter"
                type="name"
                hasIcon="right"
                placeholder="Your Phone"
                name="phone"
                style={{
                  marginTop: "1%",
                  borderRadius: "20px",
                  borderColor: "grey",
                }}
              ></Input>
              <Input
                id="newsletter"
                type="name"
                hasIcon="right"
                placeholder="Your Organization"
                name="company"
                style={{
                  marginTop: "1%",
                  borderRadius: "20px",
                  borderColor: "grey",
                }}
              ></Input>
              <br />
              <center>
                <a
                  href=""
                  className="button button-primary button-wide-mobile button-sm"
                  onClick=""
                  style={{ backgroundColor: "#3d946e", borderRadius: "20px" }}
                >
                  Submit
                </a>
                <br />
              </center>
            </form>
          </center>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;

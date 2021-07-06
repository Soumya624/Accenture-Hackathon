import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import FooterSocial from "../layout/partials/FooterSocial";
import GlobalState from "../../contexts/globalstate";
import Globalemail from "../../contexts/globalemail";
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
  alignTop,
  invertMobile,
  invertDesktop,
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

  const sectionHeader = {
    title: "",
    paragraph: "",
  };

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const [token, setToken] = useContext(GlobalState);

  const [email, setEmail] = useContext(Globalemail);
  const [donorToken, setDonorToken] = useState("bearer" + " " + token);
  const [donorData, setDonorData] = useState("");
  const [donorStudents, setDonorStudents] = useState([]);
  //const [email1,setEmail1]=useState(props.location.state.email)
  const [redirecthome, setRedirectHome] = useState(false);

  useEffect(() => {
    axios
      .get("/donorDashboard", {
        headers: {
          email: email,
          authorization: donorToken,
        },
      })
      .then((response) => {
        //console.log(response.data)
        //console.log(donorToken)
        setDonorData(response.data);
        setToken(donorToken);
      })
      .catch((err) => {
        setRedirectHome(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/adoptedStudents", {
        headers: {
          email: email,
          authorization: donorToken,
        },
      })
      .then((response) => {
        //console.log(response.data)
        setDonorStudents(response.data);
      })
      .catch((err) => {
        setRedirectHome(true);
      });
  }, []);

  if (redirecthome) {
    return <Redirect to={{ pathname: "/Login_Donor", state: {} }} />;
  } else {
    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={splitClasses}>
              <div className="split-item">
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                ></div>
              </div>
            </div>
            <center>
              <a
                href="#"
                style={{ color: "#3d946e", fontSize: "14px", margin: "0rem" }}
              >
                Adopted Students Information
              </a>
            </center>
            <div
              style={{
                padding: "3%",
                margin: "0% 0% 4% 0",
                border: "1px solid #3d946e",
                boxShadow: "#0000000a 3px 2px 2px",
                borderRadius: "20px",
              }}
            >
              {donorStudents.map((student, index) => {
                return (
                  <div className="row" style={{ alignItems: "center" }}>
                    <div className="column2" style={{ padding: "1%" }}>
                      <p
                        className="text-sm mb-0"
                        style={{ textAlign: "left", fontSize: "14px" }}
                      >
                        {student.name}
                      </p>
                    </div>
                    <div className="column1" style={{ padding: "1%" }}>
                      <p
                        className="text-sm mb-0"
                        style={{ textAlign: "left", fontSize: "14px" }}
                      >
                        {student.intro}
                      </p>
                    </div>
                  </div>
                );
              })}
              <br />

              <center>
                <Link
                  to={{
                    pathname: "/Dashboard2_Donor",
                    state: {
                      donortoken: donorToken,
                      donorData: donorData,
                      email: email,
                    },
                  }}
                  className="button button-primary button-wide-mobile button-sm"
                  onClick=""
                  style={{ backgroundColor: "#3d946e" }}
                >
                  Show More
                </Link>
              </center>
            </div>
            <div style={{ padding: "3%", margin: "4% 0%" }}>
              <div className="row" style={{ alignItems: "center" }}>
                <div className="column" style={{ padding: "1%" }}>
                  <center>
                    <img
                      src="http://cdn.onlinewebfonts.com/svg/img_125535.png"
                      alt=""
                      style={{ width: "50%" }}
                    />
                  </center>
                  <br />
                </div>
                <div className="column" style={{ padding: "1%" }}>
                  <p
                    className="text-sm mb-0"
                    style={{ textAlign: "left", fontSize: "14px" }}
                  >
                    <b>{donorData.name}</b>
                    <br />
                    Your City:{donorData.city} <br />
                    Your Pincode: {donorData.pin}
                    <br />
                    Your Phone Number: {donorData.phone}
                    <br />
                    Ace: 435353456
                    <br />
                    <br />
                    <Link
                      to="/Feed_Donor"
                      className="button button-primary button-wide-mobile button-sm"
                      onClick=""
                      style={{ backgroundColor: "#3d946e" }}
                    >
                      Gain More
                    </Link>
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;

import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link } from "react-router-dom";
import "./style.css";
import FooterSocial from "../layout/partials/FooterSocial";
import { Chart } from "react-google-charts";
import axios from "../../api/axios";
import Carousel from "react-multi-carousel";
import GlobalState from "../../contexts/globalstate";
import Globalemail from "../../contexts/globalemail";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

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
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "",
    paragraph: "",
  };

  //console.log(props.location)
  const [gtoken, setGtoken] = useContext(GlobalState);
  const [gemail, setGemail] = useContext(Globalemail);
  const [Token, setToken] = useState("bearer" + " " + gtoken.token);
  const [cumulativeMarks, setCumulativeMarks] = useState([]);
  const [percentageMarks, setPercentageMarks] = useState([]);
  const [email, setEmail] = useState(gemail);
  const [userToken, setUserToken] = useState("");

  //const [userToken, setUserToken] = useState(
  // {"_id":"60c8c89c4604cf597c04a824","name":"sakshi","age":20,"gender":"female","address":"abc ","city":"indore","pin":452007,"phone":"9348386468","guardianName":"cvhblj","guardianAge":12,"guardianGender":"male","guardianPhone":"5628462837","guardianRelation":"uncle","grade":12,"intro":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi augue, scelerisque ac risus eu, ornare porta ex. Nulla fringilla quam vel nunc vulputate, in cursus purus tempus. Donec leo augue, faucibus eget lacinia quis, sagittis vel diam. Integer aliquam cursus posuere. Vivamus eget dignissim libero. Aliquam sodales massa dui,","body":"uigvouwb","aim":"doctor","requirements":"money","email":"aj@gmail.com","password":"$2a$10$lY7OoYv4F6xyYKE82WQy7ed7qtSapG1Wv9i7HhPZrofnJlXSlWMh.","parent_id":"60c8e94e2aeafe3b84051cc7","__v":0,"photo":"https://images.ctfassets.net/p0qf7j048i0q/6UM0DTikFfdNvAu5jym5x9/c7ab7310b07ff8613ec0232135d5d9c9/G1155346217.jpg"}
  //)
  //console.log(Token)
  useEffect(() => {
    //console.log(Token)
    axios
      .get("/getMarks", {
        headers: {
          authorization: Token,
          email: email,
        },
      })
      .then((response) => {
        console.log(response.data);
        let cumulative_marksheet = [];
        let percentage_marksheet = [];
        let total_marks = 0;
        for (let i = 0; i < response.data.length; i++) {
          let subject = response.data[i];
          let sum_of_marks = 0;
          let j;
          for (j = 0; j < subject.marks.length; j++) {
            sum_of_marks += parseFloat(subject.marks[j]);
          }
          let cumulative = sum_of_marks / j;
          total_marks += cumulative;
          cumulative_marksheet[i] = [subject.subject, cumulative];
        }
        percentage_marksheet[0] = ["Task", "100"];
        for (let k = 1; k < cumulative_marksheet.length + 1; k++) {
          percentage_marksheet[k] = [
            cumulative_marksheet[k - 1][0],
            (cumulative_marksheet[k - 1][1] / total_marks) * 100,
          ];
        }
        //console.log(percentage_marksheet)
        //console.log(cumulative_marksheet)
        setCumulativeMarks(cumulative_marksheet);
        setPercentageMarks(percentage_marksheet);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/studentProfile", {
        headers: {
          authorization: Token,
          email: email,
        },
      })
      .then((response) => {
        //console.log(response.data)
        setUserToken(response.data);
      });
  }, []);

  //const [userToken, setUserToken] = useState(
  //   {"_id":"60c8c89c4604cf597c04a824","name":"sakshi","age":20,"gender":"female","address":"abc ","city":"indore","pin":452007,"phone":"9348386468","guardianName":"cvhblj","guardianAge":12,"guardianGender":"male","guardianPhone":"5628462837","guardianRelation":"uncle","grade":12,"intro":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi augue, scelerisque ac risus eu, ornare porta ex. Nulla fringilla quam vel nunc vulputate, in cursus purus tempus. Donec leo augue, faucibus eget lacinia quis, sagittis vel diam. Integer aliquam cursus posuere. Vivamus eget dignissim libero. Aliquam sodales massa dui,","body":"uigvouwb","aim":"doctor","requirements":"money","email":"aj@gmail.com","password":"$2a$10$lY7OoYv4F6xyYKE82WQy7ed7qtSapG1Wv9i7HhPZrofnJlXSlWMh.","parent_id":"60c8e94e2aeafe3b84051cc7","__v":0,"photo":"https://images.ctfassets.net/p0qf7j048i0q/6UM0DTikFfdNvAu5jym5x9/c7ab7310b07ff8613ec0232135d5d9c9/G1155346217.jpg"}
  //)
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFile = (event) => {
    setSelectedFile(event.target.files[0]);
    let formData = new FormData();
    formData.append("file_uploaded", selectedFile);
    axios.post("/upload", formData).then((response) => {
      document.getElementById("loader_message").innerText =
        "File Successfully Uploaded!";
    });
  };

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
              >
                <p className="m-0" style={{ alignItems: "center" }}>
                  <br />
                  <div
                    style={{
                      border: "1px solid #3d946e",
                      padding: "7%",
                      margin: "4% 0%",
                      borderRadius: "20px",
                      boxShadow: "#0000000a 3px 2px 2px",
                    }}
                  >
                    <div className="row">
                      <div
                        className="column"
                        style={{ padding: "1% 1% 1% 0%" }}
                      >
                        <center>
                          <img
                            src={userToken.photo}
                            alt=""
                            style={{ width: "60%" }}
                          />
                        </center>
                        <p
                          className="text-sm mb-0"
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {userToken.name}
                        </p>
                        <br />
                        <br />
                      </div>
                      <div className="column" style={{ padding: "1%" }}>
                        <p
                          className="text-sm mb-0"
                          style={{ textAlign: "left", fontSize: "14px" }}
                        >
                          Age: {userToken.age}
                          <br />
                          Gender: {userToken.gender}
                          <br />
                          City: {userToken.city}
                          <br />
                          Pin code: {userToken.pin}
                          <br />
                          Phone no.: {userToken.phone}
                          <br />
                          Standard: {userToken.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      border: "1px solid #3d946e",
                      padding: "7%",
                      margin: "4% 0%",
                      borderRadius: "20px",
                      boxShadow: "#0000000a 3px 2px 2px",
                    }}
                  >
                    <div className="row">
                      <div
                        className="column"
                        style={{ padding: "1% 1% 1% 0%" }}
                      >
                        <center>
                          <img
                            src="http://cdn.onlinewebfonts.com/svg/img_125535.png"
                            alt=""
                            style={{ width: "60%" }}
                          />
                        </center>
                        <p
                          className="text-sm mb-0"
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {userToken.guardianName}
                        </p>
                        <br />
                        <br />
                        <center>
                          <a
                            href={"tel:" + userToken.guardianPhone}
                            className="button button-primary button-wide-mobile button-sm"
                            onClick=""
                            style={{
                              backgroundColor: "#3d946e",
                              borderRadius: "20px",
                            }}
                          >
                            Contact Now
                          </a>
                        </center>
                      </div>
                      <div className="column" style={{ padding: "1%" }}>
                        <p
                          className="text-sm mb-0"
                          style={{ textAlign: "left", fontSize: "14px" }}
                        >
                          Parent's Age: {userToken.guardianAge}
                          <br />
                          Parent's gender: {userToken.guardianGender}
                          <br />
                          
                          Relation: {userToken.guardianRelation}
                          <br />
                          UPI Id: {userToken.guardianPhone}
                          <br />
                          Address: {userToken.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </p>
              </div>
              <div
                className="split-item-image center-content-mobile reveal-from-bottom"
                data-reveal-container=".split-item"
                style={{ paddingLeft: "2%" }}
              >
                <p>
                <center>
                      <a href="#" style={{color:"grey", fontSize:"14px", margin:"0.5rem"}}>Mail Your Donor Now!</a><br/>
                      <Carousel
                        responsive={responsive}
                        style={{ alignItems: "center", marginTop:"1%" }}
                      >
                        <div
                          style={{
                            height: "auto",
                            margin: "10px",
                            borderRadius: "20px",
                            padding:"2%",
                            paddingBottom: "10px",
                            boxShadow: "#0000000a 3px 2px 2px",
                          }}
                        >
                          <center>
                            <img
                              src="http://cdn.onlinewebfonts.com/svg/img_125535.png"
                              alt="Features split 03"
                              style={{ width: "60%", marginRight:"20%" }}
                            />
                            <p
                              style={{
                                marginBottom: "2%",
                                fontSize: "14px",
                                marginTop: "3%",
                              }}
                            >
                              Sourav Dev
                              <br />
                              Email: test5@gmail.com
                            </p>
                            <br/>
                          </center>
                        </div>
                        <div
                          style={{
                            height: "auto",
                            margin: "10px",
                            borderRadius: "20px",
                            padding:"2%",
                            paddingBottom: "10px",
                            boxShadow: "#0000000a 3px 2px 2px",
                          }}
                        >
                          <center>
                            <img
                              src="http://cdn.onlinewebfonts.com/svg/img_125535.png"
                              alt="Features split 03"
                              style={{width: "60%", marginRight:"20%"}}
                            />
                            <p
                              style={{
                                marginBottom: "2%",
                                fontSize: "14px",
                                marginTop: "3%",
                              }}
                            >
                              Arjun Krishna
                              <br />
                              Email: test6@gmail.com
                            </p>
                            <br/>
                          </center>
                        </div>
                        <div
                          style={{
                            height: "auto",
                            margin: "10px",
                            borderRadius: "20px",
                            padding:"2%",
                            paddingBottom: "10px",
                            boxShadow: "#0000000a 3px 2px 2px",
                          }}
                        >
                          <center>
                            <img
                              src="http://cdn.onlinewebfonts.com/svg/img_125535.png"
                              alt="Features split 03"
                              style={{width: "60%", marginRight:"20%"}}
                            />
                            <p
                              style={{
                                marginBottom: "2%",
                                fontSize: "14px",
                                marginTop: "3%",
                              }}
                            >
                              Piyush Goyal
                              <br />
                              Email: test7@gmail.com
                            </p>
                            <br/>
                          </center>
                        </div>
                        <div
                          style={{
                            height: "auto",
                            margin: "10px",
                            borderRadius: "20px",
                            padding:"2%",
                            paddingBottom: "10px",
                            boxShadow: "#0000000a 3px 2px 2px",
                          }}
                        >
                          <center>
                            <center>
                            <img
                              src="http://cdn.onlinewebfonts.com/svg/img_125535.png"
                              alt="Features split 03"
                              style={{width: "60%", marginRight:"20%"}}
                            />
                            </center>
                            <p
                              style={{
                                marginBottom: "2%",
                                fontSize: "14px",
                                marginTop: "3%",
                              }}
                            >
                              Ajay Sen
                              <br />
                              Email: test8@gmail.com
                            </p>
                            <br/>
                          </center>
                        </div>
                      </Carousel>
                    </center>
                  <center>
                    <Input
                      type="file"
                      style={{
                        borderRadius: "20px",
                        borderColor: "grey",
                        color: "grey",
                      }}
                      onChange={(event) => {
                        uploadFile(event);
                      }}
                    />
                    <div
                      id="loader_message"
                      style={
                        selectedFile
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                    >
                      File is uploading, Please wait...
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
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;

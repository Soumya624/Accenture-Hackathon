import React, {useEffect, useState,useContext} from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link } from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import { Chart } from "react-google-charts";
import axios from "../../api/axios";

import GlobalState from "../../contexts/globalstate"
import Globalemail from '../../contexts/globalemail'

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

    //console.log(props.location)
    const [gtoken,setGtoken]=useContext(GlobalState)
    const [gemail,setGemail]=useContext(Globalemail)
    const [Token,setToken]=useState('bearer'+' '+ gtoken.token)
    const [cumulativeMarks, setCumulativeMarks] = useState([]);
    const [percentageMarks, setPercentageMarks] = useState([]);
    const [email,setEmail]=useState(gemail);
    const [userToken,setUserToken]=useState('')

    //const [userToken, setUserToken] = useState(
       // {"_id":"60c8c89c4604cf597c04a824","name":"sakshi","age":20,"gender":"female","address":"abc ","city":"indore","pin":452007,"phone":"9348386468","guardianName":"cvhblj","guardianAge":12,"guardianGender":"male","guardianPhone":"5628462837","guardianRelation":"uncle","grade":12,"intro":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi augue, scelerisque ac risus eu, ornare porta ex. Nulla fringilla quam vel nunc vulputate, in cursus purus tempus. Donec leo augue, faucibus eget lacinia quis, sagittis vel diam. Integer aliquam cursus posuere. Vivamus eget dignissim libero. Aliquam sodales massa dui,","body":"uigvouwb","aim":"doctor","requirements":"money","email":"aj@gmail.com","password":"$2a$10$lY7OoYv4F6xyYKE82WQy7ed7qtSapG1Wv9i7HhPZrofnJlXSlWMh.","parent_id":"60c8e94e2aeafe3b84051cc7","__v":0,"photo":"https://images.ctfassets.net/p0qf7j048i0q/6UM0DTikFfdNvAu5jym5x9/c7ab7310b07ff8613ec0232135d5d9c9/G1155346217.jpg"}
    //)
    //console.log(Token)
    useEffect(() => {
        //console.log(Token)
        axios.get('/getMarks', {
            headers : {
                authorization: Token,
                email : email
            }
        })
            .then(response => {
              
                console.log(response.data)
                let cumulative_marksheet = []
                let percentage_marksheet = []
                let total_marks = 0;
                for (let i=0; i < response.data.length; i++){
                    let subject = response.data[i]
                    let sum_of_marks = 0;
                    let j;
                    for (j=0; j < subject.marks.length; j++){
                        sum_of_marks += parseFloat(subject.marks[j])
                    }
                    let cumulative = sum_of_marks/j
                    total_marks += cumulative
                    cumulative_marksheet[i] = [subject.subject, cumulative]
                }
                percentage_marksheet[0] = ['Task', '100']
                for (let k=1; k < cumulative_marksheet.length+1; k++){
                    percentage_marksheet[k] = [cumulative_marksheet[k-1][0], (cumulative_marksheet[k-1][1]/total_marks)*100]
                }
                //console.log(percentage_marksheet)
                //console.log(cumulative_marksheet)
                setCumulativeMarks(cumulative_marksheet)
                setPercentageMarks(percentage_marksheet)
            })
    }, []);
    useEffect(() => {
      axios.get('/studentProfile', {
          headers : {
            authorization: Token,
            email : email
          }
      }).then((response) => {
              //console.log(response.data)
              setUserToken(response.data)
  
          })
  }, []);
    
    //const [userToken, setUserToken] = useState(
     //   {"_id":"60c8c89c4604cf597c04a824","name":"sakshi","age":20,"gender":"female","address":"abc ","city":"indore","pin":452007,"phone":"9348386468","guardianName":"cvhblj","guardianAge":12,"guardianGender":"male","guardianPhone":"5628462837","guardianRelation":"uncle","grade":12,"intro":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi augue, scelerisque ac risus eu, ornare porta ex. Nulla fringilla quam vel nunc vulputate, in cursus purus tempus. Donec leo augue, faucibus eget lacinia quis, sagittis vel diam. Integer aliquam cursus posuere. Vivamus eget dignissim libero. Aliquam sodales massa dui,","body":"uigvouwb","aim":"doctor","requirements":"money","email":"aj@gmail.com","password":"$2a$10$lY7OoYv4F6xyYKE82WQy7ed7qtSapG1Wv9i7HhPZrofnJlXSlWMh.","parent_id":"60c8e94e2aeafe3b84051cc7","__v":0,"photo":"https://images.ctfassets.net/p0qf7j048i0q/6UM0DTikFfdNvAu5jym5x9/c7ab7310b07ff8613ec0232135d5d9c9/G1155346217.jpg"}
    //)
    const [selectedFile, setSelectedFile] = useState(null);

    const uploadFile = (event) => {
        setSelectedFile(event.target.files[0])
        let formData = new FormData();
        formData.append('file_uploaded', selectedFile)
        axios.post('/upload', formData)
            .then(response => {
                document.getElementById('loader_message').innerText = "File Successfully Uploaded!"
            })
    }

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
                  <br/>
                    <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src={userToken.photo} alt="" style={{width:"70%"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                        {userToken.name}
                                    </p>
                                    <br/>
                                    <br/>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                    Age: {userToken.age}<br/>Gender: {userToken.gender}<br/>City: {userToken.city}<br/>Pin code: {userToken.pin}<br/>Phone no.: {userToken.phone}<br/>Standard: {userToken.grade}

                                    </p>
                                </div>
                        </div>
                    </div>
                    <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" style={{width:"2rem"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                    Guardian Name: {userToken.guardianName}
                                    </p>
                                    <br/>
                                    <br/>
                                    <center>
                                    <a href={"tel:" + userToken.guardianPhone} className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Call</a>
                                    </center>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                    Guardian Age: {userToken.guardianAge}<br/>Guardian gender: {userToken.guardianGender}<br/>Guardian phone: {userToken.guardianPhone}<br/>Relation: {userToken.guardianRelation}<br/>Address: {userToken.address}

                                    </p>
                                </div>
                        </div>
                    </div>
                </p>
              </div>
              <div className=' center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <center>
                        <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%", width:"80%"}}>
                          <center>
                          <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={percentageMarks}
                            options={{
                              title: 'Cumulative: 100',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                            </center>
                            <br/>
                            <p className="text-sm mb-0" style={{fontSize:"14px"}}>
                                {userToken.requirements}
                            </p>
                            <br/>
                            <br/>
                            <div style={{alignItems:"center"}}>
                              <img src="file.png" alt="" style={{width:"35%", textAlign:"center"}}/>
                              <br/>
                              <Input type="file" style={{borderRadius:"20px", borderColor:"grey", color:"grey"}} onChange={(event)=>{
                                  uploadFile(event)
                              }}/>
                                <div id="loader_message" style={selectedFile?{display: 'inline'}:{display: 'none'}}>File is uploading, Please wait...</div>
                            </div>
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

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
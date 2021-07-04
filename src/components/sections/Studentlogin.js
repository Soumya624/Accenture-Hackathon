import React, {useState,useContext} from 'react';
import classNames from 'classnames';
import {SectionSplitProps} from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import {Link,Redirect} from 'react-router-dom';
import {useTranslation} from "react-i18next";
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

    const {t} = useTranslation();

    const sectionHeader = {
        title: '',
        paragraph: '-'
    };
    const [token,setToken]=useContext(GlobalState)
    console.log(token)
    const [username1, setUsername1]=useContext(Globalemail)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect] = useState('');
    //const [token, setToken] = useState({});
    
    const studentLoginHandler = (e)=>{
        e.preventDefault()
        if (!username){
            alert("Username is per")
        }
        axios.get('/studentLogin',{
            headers: {
                'email':username,
                'password':password
            }
        }).then((response)=>{
            //console.log(response.data)
            setToken(response.data)
            setUsername1(username)
            setRedirect(true)
        })
        //.catch((err)=>{
          //  alert('password or username incorrect')
        //})
    }
    if (redirect){
        return (<Redirect to={{pathname:"/Dashboard1_Student",state:{token:token,username:username}}} />)
    }
    else{
    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader data={sectionHeader} className="center-content">
                        <h2>{t('key25')}</h2>
                    </SectionHeader>
                    <div className={splitClasses}>

                        <div className="split-item">
                            <div className="split-item-content center-content-mobile reveal-from-left"
                                 data-reveal-container=".split-item">
                                {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                                <form>
                                    <Input id="newsletter" type="email" value={username} onChange={(e)=>{setUsername(e.target.value)}} hasIcon="right" placeholder="Your Username"
                                           name="username"
                                           style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
                                    </Input>
                                    <Input id="newsletter" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} hasIcon="right"
                                           placeholder="Your Password" name="password"
                                           style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
                                    </Input>
                                    {/* <center>
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
                    </center> */}
                                    <br/>
                                    <center>
                                        <button type="submit"
                                                className="button button-primary button-wide-mobile button-sm"
                                                onClick={studentLoginHandler} style={{
                                            backgroundColor: "#3d946e",
                                            borderRadius: "20px"
                                        }}>Login</button>
                                        <br/><br/>{t('key30')} <a href="/Signup_Student">{t('key27')}</a>
                                    </center>
                                </form>
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
                                    height={396}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
                       }
FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
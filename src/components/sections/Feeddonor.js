import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {SectionSplitProps} from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Pagination from 'rc-pagination';
import {Link} from 'react-router-dom';
import Carousel from "react-multi-carousel";
import Input from '../elements/Input';
import "react-multi-carousel/lib/styles.css";
import i18n from "i18next";
import {useTranslation, initReactI18next} from "react-i18next";
import {x} from './Hero';
import axios from "../../api/axios";

console.log(`${x}`);

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

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

    const [studentList, setStudentList] = useState([])
    const [citySearch, setCitySearch] = useState([])

    useEffect(() => {
        axios.get('/donorFeed', {
            params:{
                pageNo:1,
                size:6
            }
        }).then((response)=>{
            console.log(response.data)
            if (response.data.error){
                alert(response.data.message)
            }else{
                setStudentList(response.data.message)
            }
        })
    }, []);

    const search = () => {
        axios.get('/donorFeed', {
            headers:{
                'location':citySearch
            },
            params:{
                pageNo:1,
                size:6
            }
        }).then( (response) => {
            if (response.data.error){
                alert(response.data.message)
            }else{
                setStudentList(response.data.message)
                setCitySearch('')
            }
        })
    }

    const keyPressHandler = (e)=>{
        if (e.which === 13) {
            search()
        }
    }

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

    // alert("Please Use Student's Emails to Schedule a Meeing");
    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader data={sectionHeader} className="center-content">
                        <Input id="newsletter" type="text"  label="Subscribe" labelHidden hasIcon="right"
                               value={citySearch} onChange={(e)=>{setCitySearch(e.target.value)}}
                               onKeyPress={keyPressHandler}
                               placeholder="Search for City" name="news"
                               style={{margin: "4% 0%", borderRadius: "20px", borderColor: "grey"}}>
                            <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9"/>
                            </svg>
                        </Input>
                        <p>{t('key17')}</p>
                    </SectionHeader>
                    <div className={splitClasses}>

                        {
                            studentList.length?studentList.map((student, index)=>{
                                return (
                                    <div className="split-item">
                                        <div className="split-item-content center-content-mobile"
                                             data-reveal-container=".split-item">
                                            <h4 className="mt-0 mb-12">
                                                {student.name}
                                                
                                            </h4>
                                            <p className="m-0" style={{fontSize: "14px"}}>
                                                Age : {student.age}
                                            </p>
                                            <p className="m-0" style={{fontSize: "14px"}}>
                                                {student.intro?student.intro:"No introduction provided!"}
                                            </p>
                                            <center>
                                                <a href="/Profile" className="button button-primary button-wide-mobile button-sm"
                                                   style={{backgroundColor: "#3d946e", borderRadius: "20px", marginTop: "2%"}}>Read
                                                    More</a>
                                            </center>
                                        </div>
                                        <div className={
                                            classNames(
                                                'split-item-image center-content-mobile',
                                                imageFill && 'split-item-image-fill'
                                            )}
                                             data-reveal-container=".split-item">
                                            <Image
                                                src={student.photo}
                                                alt="Features split 01"
                                                style={{width: "60%"}}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                                : <div className="split-item">
                                    <div className="split-item-content center-content-mobile reveal-from-left"
                                         data-reveal-container=".split-item">
                                        <h3 className="mt-0 mb-12">
                                            No Students yet!
                                        </h3>
                                    </div>
                                </div>
                        }

                        <br/>
                        <br/>
                        <Carousel responsive={responsive} style={{alignItems: "center"}}>
                            {
                                studentList.length?studentList.map((student, index)=>{
                                    return (
                                        <div>
                                            <center>
                                                <Image
                                                    src={student.photo}
                                                    alt="Features split 03"
                                                    style={{width: "50%"}}
                                                />
                                                <a href="/Profile" className="button button-primary button-wide-mobile button-sm"
                                                   style={{backgroundColor: "#3d946e", borderRadius: "20px", marginTop: "2%"}}>Read
                                                    More</a>
                                            </center>
                                        </div>
                                    )
                                }): <div>
                                    <center>
                                       Oops, No Students Yet!
                                    </center>
                                </div>
                            }
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/i1.jpg')}
                                        alt="Features split 03"
                                        style={{width: "50%"}}
                                    />
                                    <a href="/Profile" className="button button-primary button-wide-mobile button-sm"
                                       style={{backgroundColor: "#3d946e", borderRadius: "20px", marginTop: "2%"}}>Read
                                        More</a>
                                </center>
                            </div>
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/i2.jpg')}
                                        alt="Features split 03"
                                        style={{width: "50%"}}
                                    />
                                    <a href="/Profile" className="button button-primary button-wide-mobile button-sm"
                                       style={{backgroundColor: "#3d946e", borderRadius: "20px", marginTop: "2%"}}>Read
                                        More</a>
                                </center>
                            </div>
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/i3.jpg')}
                                        alt="Features split 03"
                                        style={{width: "50%"}}
                                    />
                                    <a href="/Profile" className="button button-primary button-wide-mobile button-sm"
                                       style={{backgroundColor: "#3d946e", borderRadius: "20px", marginTop: "2%"}}>Read
                                        More</a>
                                </center>
                            </div>
                        </Carousel>;
                    </div>
                </div>
            </div>
        </section>
    );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
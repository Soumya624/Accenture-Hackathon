import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {SectionSplitProps} from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Carousel from "react-multi-carousel";
import Input from '../elements/Input';
import "react-multi-carousel/lib/styles.css";
import {useTranslation} from "react-i18next";
import axios from "../../api/axios";
// import { x } from './Hero';
// // console.log(`${x}`);

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


    const [newsList, setNewsList] = useState([])
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        axios.get('/getNews', {
            params:{
                pageNo:1,
                size:3
            }
        }).then( (response) => {
            console.log(response.data)
            if (response.data.error){
                alert(response.data.message)
            }else{
                setNewsList(response.data.message)
            }
        })
    }, [])

    const search = () => {
        axios.get('/getNews', {
            headers:{
                'location':searchText
            },
            params : {
                pageNo:1,
                size:3
            }
        }).then( (response) => {
            if (response.data.error){
                alert(response.data.message)
            }else{
                setNewsList(response.data.message)
                setSearchText('')
            }
        })
    }

    const keyPressHandler = (e)=>{
        if (e.which === 13) {
            search()
        }
    }

    const NewsListView = () => {
        if (newsList.length){
            return newsList.map((news, index)=>{
                return(
                    <div className="split-item" id={index}>
                        <div className="split-item-image center-content-mobile" data-reveal-container=".split-item">
                            <h3 className="mt-0 mb-12">
                                {news.heading}
                            </h3>
                            <p className="m-0">
                                {news.content}
                            </p>
                        </div>
                        <div className={
                            classNames(
                                'split-item-content center-content-mobile',
                                imageFill && 'split-item-image-fill'
                            )}
                             data-reveal-container=".split-item">
                            <Image
                                src={news.image_url}
                                alt="Features split 01"
                                width={528}
                                height={396}/>
                        </div>
                    </div>
                )
            })
        }else{
            return (
                <div className="split-item">
                    <div className="split-item-image center-content-mobile" data-reveal-container=".split-item">
                        <h3 className="mt-0 mb-12">
                            Oops, No news found!
                        </h3>
                    </div>
                </div>
            );
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


    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader data={sectionHeader} className="center-content">
                        <Input type="text" label="Subscribe" labelHidden hasIcon="right"
                               placeholder="Search Location" name="news"
                               style={{margin: "4% 0%", borderRadius: "20px", borderColor: "grey"}}
                               value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}
                               onKeyPress={keyPressHandler}
                        >
                            <svg onClick={search} width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9"/>
                            </svg>
                        </Input>
                        <p>{t('key17')}</p>
                    </SectionHeader>
                    <div className={splitClasses}>

                        <NewsListView/>

                        <br/>
                        <Carousel responsive={responsive} style={{alignItems: "center"}}>
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/c4.png')}
                                        alt="Features split 03"
                                    />
                                </center>
                            </div>
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/c1.jpg')}
                                        alt="Features split 03"
                                    />
                                </center>
                            </div>
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/c4.png')}
                                        alt="Features split 03"
                                    />
                                </center>
                            </div>
                            <div>
                                <center>
                                    <Image
                                        src={require('./../../assets/images/c6.jpg')}
                                        alt="Features split 03"
                                    />
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
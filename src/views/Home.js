import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';


const Home = () => {
    const refCta = React.useRef(null)
    const [ ref, setRef ] = React.useState(null)

    React.useEffect(()=>{
        console.log(refCta)
        setRef(refCta)
        console.log(refCta)
    },[refCta])
    
    return (
        <>
            <br/><br/><br/>
            <Hero className="illustration-section-01" refCta={refCta}/>
            <br/><br/><br/><br/>
            <FeaturesTiles/>
            <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02"/>
            <Testimonial topDivider/>
            <div ref={refCta}>
                <Cta split/>
            </div>
            
        </>
    );
}

export default Home;
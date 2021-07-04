import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from '../sections/Hero';
console.log(`${x}`);
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      English: {
        translation: {
          "key": "Hero",
          "key1": "Be a",
          "key2":"Virtually Adopt a Child For His/Her Education",
          "key3": "Home",
          "key4": "Feeds",
          "key5": "News",
          "key6":"Join",
          "key7":"Adopt Now",
          "key8":"Student",
          "key9":"Join Here",
          "key10":"Select",
          "key11":"Interact",
          "key12":"Plan",
          "key13":"Pay",
          "key14":"Get monthly reports",
          "key15":"Build personal connection",
          "key16":"How we work",
          "key17":"We provide a one to one give and take method so you can know everything about your impact.",
          "key18":"Impacted Lives",
          "key19":"We trust your motive that makes us help you impact lives.",
          "key20":"Why us",
          "key21":"We let you know how your donation money is used in the welfare of children and helps you build a personal connection.",
          "key22":"Want To Be A Hero?",
          "key23":"Signup As a Donor",
          "key24":"Login As a Donor",
          "key25":"Signup As a Student",
          "key26":"Login As a Student",
          "key27":"Signup",
          "key28":"Login",
          "key29":"Already Have an Account?",
          "key30":"Don't Have an Account?",
          "key31":"Dashboard",
          "key32":"Logout",
          "key33":"Made by eDOPT. All right reserved",
        }
      },
      Hindi: {
        translation: {
          "key": "नायक",
          "key1": "बनें",
          "key2":"एक बच्चे को उसकी शिक्षा के लिए मदद करें",
          "key3": "होमपेज",
          "key4": "फ़ीड",
          "key5":"समाचार",
          "key6": "रजिस्टर करें",
          "key7":"अब अपनाये",
          "key8":"छात्र",
          "key9":"यहाँ शामिल होएं",
          "key10":"चुनते हैं",
          "key11":"सहभागिता",
          "key12":"योजना",
          "key13":"वेतन",
          "key14":"मासिक रिपोर्ट प्राप्त करें",
          "key15":"व्यक्तिगत संबंध बनाएं",
          "key16":"हम कैसे काम करते हैं",
          "key17":"हम एक से एक देने और लेने की विधि प्रदान करते हैं ताकि आप अपने प्रभाव के बारे में सब कुछ जान सकें",
          "key18":"प्रभावित जीवन",
          "key19":"हमें आपके मकसद पर भरोसा है जो हमें जीवन को प्रभावित करने में आपकी मदद करता है",
          "key20":"हम क्यों",
          "key21":"हम आपको बताते हैं कि आपके दान के पैसे का उपयोग बच्चों के कल्याण में कैसे किया जाता है और आपको व्यक्तिगत संबंध बनाने में मदद करता है",
          "key22":"नायक बनना चाहते हैं?",
          "key23":"साइनअप डोनर",
          "key24":"लॉगिन डोनर",
          "key25":"साइनअप छात्र",
          "key26":"लॉगिन छात्र",
          "key27":"साइनअप",
          "key28":"लॉगिन",
          "key29":"पहले से ही एक खाता है?",
          "key30":"खाता नहीं है?",
          "key31":"डैशबोर्ड",
          "key32":"लॉग आउट",
          "key33":"eDOPT द्वारा किया गया। सर्वाधिकार सुरक्षित"
        }
      },
      hindi: {
        translation: {
          "key": "नायक",
          "key1": "बनें",
          "key2":"एक बच्चे को उसकी शिक्षा के लिए मदद करें",
          "key3": "होमपेज",
          "key4": "फ़ीड",
          "key5":"समाचार",
          "key6": "रजिस्टर करें",
          "key7":"अब अपनाये",
          "key8":"छात्र",
          "key9":"यहाँ शामिल होएं",
          "key10":"चुनते हैं",
          "key11":"सहभागिता",
          "key12":"योजना",
          "key13":"वेतन",
          "key14":"मासिक रिपोर्ट प्राप्त करें",
          "key15":"व्यक्तिगत संबंध बनाएं",
          "key16":"हम कैसे काम करते हैं",
          "key17":"हम एक से एक देने और लेने की विधि प्रदान करते हैं ताकि आप अपने प्रभाव के बारे में सब कुछ जान सकें",
          "key18":"प्रभावित जीवन",
          "key19":"हमें आपके मकसद पर भरोसा है जो हमें जीवन को प्रभावित करने में आपकी मदद करता है",
          "key20":"हम क्यों",
          "key21":"हम आपको बताते हैं कि आपके दान के पैसे का उपयोग बच्चों के कल्याण में कैसे किया जाता है और आपको व्यक्तिगत संबंध बनाने में मदद करता है",
          "key22":"नायक बनना चाहते हैं?",
          "key23":"साइनअप डोनर",
          "key24":"लॉगिन डोनर",
          "key25":"साइनअप छात्र",
          "key26":"लॉगिन छात्र",
          "key27":"साइनअप",
          "key28":"लॉगिन",
          "key29":"पहले से ही एक खाता है?",
          "key30":"खाता नहीं है?",
          "key31":"डैशबोर्ड",
          "key32":"लॉग आउट",
          "key33":"eDOPT द्वारा किया गया। सर्वाधिकार सुरक्षित"
        }
      }
    },
    lng: `${x}`,
    fallbackLng: 'English',

    interpolation: {
      escapeValue: false
    }
  });

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  const { t } = useTranslation();

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="/" onClick={closeMenu}>{t('key3')}</Link>
                    </li>
                    <li>
                      <Link to="/Feed_Donor" onClick={closeMenu}>{t('key4')}</Link>
                    </li>
                    <li>
                      <Link to="/News_Donor" onClick={closeMenu}>{t('key5')}</Link>
                    </li>
                  </ul>
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li>
                        <Link to="/Signup_Donor" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu} style={{backgroundColor:"#3d946e"}}>{t('key6')}</Link>
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;

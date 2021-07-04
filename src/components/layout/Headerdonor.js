import React, { useState, useRef, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link,Redirect } from 'react-router-dom';
import Logo from './partials/Logo';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from '../sections/Hero';

import GlobalState from "../../contexts/globalstate"
import Globalemail from '../../contexts/globalemail';

console.log(`${x}`);

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

  const [token,setToken]=useContext(GlobalState)
  const [email,setEmail]=useContext(Globalemail)
  const [redirecthome,setRedirectHome]=useState(false);

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

  const { t } = useTranslation();

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );
  
  const logouthandler=()=>{
    setToken('')
    setEmail('')
    setRedirectHome(true)
  }

  if (redirecthome){
    return(<Redirect to={{pathname:"/",state:{}}} />)
  }
  else{

  
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
                      <Link to="/Dashboard1_Donor" onClick={closeMenu}>{t('key31')}</Link>
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
                        <button onClick={logouthandler}  className="button button-primary button-wide-mobile button-sm"  style={{backgroundColor:"#3d946e"}}>{t('key32')}</button>
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
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;

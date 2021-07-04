import React,{useState} from 'react';
import { Route} from 'react-router-dom';
import GlobalState from '../contexts/globalstate';
import Globalemail from '../contexts/globalemail';
const AppRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {

  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;
  const [token,setToken]=useState('')
  const [email,setEmail]=useState('')
  return (
    <Route
      {...rest}
      render={props => (
        <Globalemail.Provider value={[email,setEmail]}>
          <GlobalState.Provider value={[token, setToken]}> 
        <Layout>
          
          <Component {...props} />
          
        </Layout>
        </GlobalState.Provider>
          </Globalemail.Provider> 
      )} />
  );
}

export default AppRoute;
import React, {useState, useContext, useEffect} from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import logo from '../../assets/images/x4.jpg'
import axios from '../../api/axios';
import GlobalState from "../../contexts/globalstate"
import Globalemail from '../../contexts/globalemail';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

const sectionHeader = {
    title: '',
    paragraph: ''
  };

function App() {

	const [name, setName] = useState('')
	const [token,setToken]=useContext(GlobalState)
  	const [email,setEmail]=useContext(Globalemail)

	useEffect(() => {
		axios.get('/donorDashboard', {
			headers : {
				email:email,
				authorization: token
			}
		}).then((response) => {
				setName(response.data.name)
	
			})
	}, []);

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		// const data = await axios.post('/payment', {
		// 	headers : {
		// 		authorization : token.token,
		// 		email : email,
		// 	}
		// }).then((t) =>
		// 	t.json()
		// )

		let data;

		axios.post('payment/', {}, {
			headers : {
				authorization : token.token,
				email : email
			}
		}).then((response) => {
			data = response.data
			console.log(response);
			const options = {
				key: __DEV__ ? 'rzp_test_uGoq5ABJztRAhk' : 'PRODUCTION_KEY',
				currency: data.currency,
				amount: data.amount.toString(),
				order_id: data.id,
				name: 'Donation',
				description: 'Thank you for nothing. Please give us some money',
				image: 'http://localhost:1337/logo.svg',
				handler: function (response) {
					alert(response.razorpay_payment_id)
					alert(response.razorpay_order_id)
					alert(response.razorpay_signature)
				},
				prefill: {
					name,
					email: 'sdfdsjfh2@ndsfdf.com',
					phone_number: '9899999999'
				}
			}
			const paymentObject = new window.Razorpay(options)
			paymentObject.open()
		})
	}


	return (
        <section>
        <div className="container" style={{alignItems:"center"}}>
          <div>
            <SectionHeader data={sectionHeader} className="center-content" />
              <center>
                <br/><br/>
                <img src={logo} className="App-logo" alt="logo" style={{width:"40%", marginTop:"15%"}}/><br/>
                <p className="m-0" style={{fontSize:"14px", textAlign:"center"}}>
                    Thank you for your kind support. Click the following<br/>button to continue!
                </p>
                <br/>
                <button href="#" onClick={displayRazorpay} rel="noopener noreferrer" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", margin:"1%", borderRadius:"20px"}}>Donate</button>
                <a href="Login_Donor" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", margin:"1%", borderRadius:"20px"}}>Cancel</a>
              </center>
              <br/>
          </div>
        </div>
      </section>
	)
}

export default App
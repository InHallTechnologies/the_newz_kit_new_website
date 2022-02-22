import { Button, TextField, CircularProgress } from '@mui/material';
import { push, ref, set } from 'firebase/database';
import Head from 'next/head';
import React, { useState } from 'react';
import fetchFirebaseUID, { fetchWebsiteDetails } from '../../backend/fetchFirebaseUID';
import { firebaseDatabase } from '../../backend/firebaseHandler';
import Footer from '../../components/Footer.component';
import Navigation from '../../components/Navigation.component';
import Styles from '../../styles/ContactUs.module.scss';


const ContactUs = ({ firebaseUID, websiteDetails }) => {
    const [contactUs, setContactUs] = useState({name:'', emailId:'', phoneNumber:'', message:''});
    const [loading, setLoading] = useState(false);
   

    const handleChange = (event) => {
        const  { name, value } = event.target;
        setContactUs(state => ({...state, [name]:value}))
    }


    const handleSubmit = async () => {
        if (!contactUs.name){
            alert("Please enter your name");
            return;
        }

        if (!contactUs.emailId){
            alert("Please enter your email id");
            return;
        }

        if (!contactUs.message){
            alert("Please enter your message");
            return;
        }

        setLoading(true);
        let contactUsRef = ref(firebaseDatabase , `CONTACT_US_FOR_USERS/${firebaseUID}`);
        const key = push(contactUsRef).key;
        contactUsRef = ref(firebaseDatabase , `CONTACT_US_FOR_USERS/${firebaseUID}/${key}`);
        await set(contactUsRef, {...contactUs, key: key});
        setLoading(false);
        alert("Your query is registered");
        setContactUs({name:'', emailId:'', phoneNumber:'', message:''})
    }

    return(
        <div className={Styles.ContactUsContainer}>
            <Head>
                <title>Contact Us</title>
            </Head>
            <Navigation logo={websiteDetails.logo} />
            <div className={Styles.contectUsContent} >
                <div className={Styles.inputContainer}>
                    <h1 className={Styles.sectionTitle}>Contact Us</h1>
                    <p className={Styles.subTitle}>Please feel free to contact us for any question you might have</p>
                    <TextField sx={{marginTop:'20px'}} onChange={handleChange} value={contactUs.name} name="name" id="outlined-basic" label="Name" variant="outlined" />
                    <TextField sx={{marginTop:'20px'}} onChange={handleChange} value={contactUs.emailId} name='emailId' id="outlined-basic" type={'email'} label="Email Id" variant="outlined" />
                    <TextField sx={{marginTop:'20px'}} onChange={handleChange} value={contactUs.phoneNumber} name='phoneNumber' id="outlined-basic" type={'tel'} placeholder="+91" label="Phone Number (Optional)" variant="outlined" />
                    <TextField sx={{marginTop:'20px'}} onChange={handleChange} value={contactUs.message} name="message" minRows={4} multiline id="outlined-basic" label="Your Message" variant="outlined" />
                    <Button disabled={loading} onClick={handleSubmit} variant='contained' sx={{marginTop:'20px'}}>
                        {
                            loading
                            ?
                            <CircularProgress size={"25px"}  sx={{color:'#fff'}}/>
                            :
                            "Submit"
                        }
                        
                    </Button>
                </div>
                <div className={Styles.illustrationContainer}>
                    <img className={Styles.illustration} src='/contact-us.svg' alt='Contact US' />
                </div>
                
            </div>   

            <div  className={Styles.footerContainer}>
                <Footer style={{ marginTop:'150px' }} /> 
            </div>
            

        </div>
    )
}


export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www'){
        subdomain = "NewzKit";
    }
    let firebaseUID = await fetchFirebaseUID(subdomain);
    let websiteDetails = await fetchWebsiteDetails(firebaseUID);
    if (!firebaseUID) {
        firebaseUID = "HOME"
    }

    console.log(websiteDetails);
    if (websiteDetails === "NOT FOUND") {
        websiteDetails = {logo:'/logo.png'}
    }
    return {
      props: {
          firebaseUID, websiteDetails
      }, // will be passed to the page component as props
    }
}
  

export default ContactUs;
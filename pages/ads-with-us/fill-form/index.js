import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import fetchFirebaseUID from '../../../backend/fetchFirebaseUID';
import Styles from '../../../styles/FillForm.module.scss';
import { ref, set, push } from 'firebase/database'
import { firebaseDatabase } from '../../../backend/firebaseHandler';
import Head from 'next/head';
import NewzKitAds from '../../../components/NewzKitAds.component';


const FillForms = ({ subdomain, firebaseUID }) => {
    const [formData, setFormData] = useState({
        name:"",
        phoneNumber:"",
        occasion:"",
        location:""
    })
    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const  { name, value } = event.target;
        setFormData(state => ({...state, [name]: value}))
    }

    const handleSubmit = async () => {

        if (!formData.name){
            alert("Please enter your name");
            return;
        }

        if (!formData.phoneNumber){
            alert("Please enter your phone number");
            return;
        }

        if (!formData.occasion){
            alert("Please select your oaccasion");
            return;
        }

        if (!formData.location){
            alert("Please provide your location");
            return;
        }

        const requestKeyRef = ref(firebaseDatabase, `ADS_REQUEST_ARCHIVE/${firebaseUID?firebaseUID:"NewzKit"}`);
        const key = push(requestKeyRef).key
        const requestRef = ref(firebaseDatabase, `ADS_REQUEST_ARCHIVE/${firebaseUID?firebaseUID:"NewzKit"}/${key}`);
        await set(requestRef, {
            ...formData,
            subdomain, 
            firebaseUID:firebaseUID?firebaseUID:"NewzKit"
        })
        alert("We have received your request. We will contact you within 3 hrs.")
        setFormData({
            name:"",
            phoneNumber:"",
            occasion:"",
            location:""
        })

    }

    return (
        <div className={Styles.container}>
            <Head>
                <title>Fill Form - NewzKit</title>
            </Head>
            <div className={Styles.mainContentContainer}>
                <img className={Styles.logo} src='/logo.png' />
                <div className={Styles.content} >
                    <h1>Lets begin!</h1>
                    <p>Please provide more details for your ads</p>

                    <div className={Styles.formContainer} >
                        <TextField name="name" value={formData.name} onChange={handleChange} className={Styles.firstHalf} id="outlined-basic" label="Name" variant="outlined" />
                        <TextField name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} className={Styles.secondHalf} id="outlined-basic" label="Phone Number" type={'tel'} variant="outlined" />
                        <FormControl name='occasion' value={formData.occasion} onChange={handleChange} className={Styles.endToEnd} fullWidth>
                          <InputLabel id="demo-simple-select-label">Occasion (अवसर)</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.occasion}
                            label="Occasion (अवसर)"
                            onChange={handleChange}
                            name='occasion'
                          >
                            <MenuItem value={"Birthday"}>Birthday</MenuItem>
                            <MenuItem value={"Anniversary"}>Anniversary</MenuItem>
                            <MenuItem value={"नेताजी को बधाई संदेश"} >नेताजी को बधाई संदेश</MenuItem>
                            <MenuItem value={"Obituary (शोक संदेश)"}>Obituary (शोक संदेश)</MenuItem>
                            <MenuItem value={"Shop promotion"}>Shop promotion</MenuItem>
                            <MenuItem value={"School ad"}>School ad</MenuItem>
                            <MenuItem value={"Hospital ad"}>Hospital ad</MenuItem>
                            <MenuItem value={"Other (अन्य)"}>Other (अन्य)</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField name='location' value={formData.location} onChange={handleChange} className={Styles.endToEnd} id="outlined-basic" label="Location"  variant="outlined" placeholder='City, District, State' />
                        <Button onClick={handleSubmit} className={Styles.endToEnd} variant='contained' sx={{width:"200px", margin:'0 auto'}} >Submit Form</Button>
                        
                    </div>
                    {/* <div className={Styles.adsContainer}>
                        <NewzKitAds />
                    </div> */}
                </div>
            </div>

            <div className={Styles.illustrationContainer}>
                <div className={Styles.quoteContainer}>
                    <blockquote><i>The secret of getting ahead is getting started</i> - Mark Taiwan</blockquote>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0];
    let firebaseUID = ""
    if (subdomain === 'localhost:3000' || subdomain === 'thenewzkit' || subdomain === 'www'){
        subdomain = "home";
    }else {
        firebaseUID = await fetchFirebaseUID(subdomain)
    }

    return {
        props: {
            subdomain, firebaseUID
        },
    };
}

export default FillForms;
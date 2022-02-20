import React from 'react';
import fetchFirebaseUID, { fetchUPI, fetchWebsiteDetails } from '../../backend/fetchFirebaseUID';
import Navigation from '../../components/Navigation.component';
import Styles from '../../styles/SupportUs.module.scss';
import QRCode from 'react-qr-code';
import Head from 'next/head';

const SupportUs = ({upiAddress, websiteDetails}) => {

    return (
        <div className={Styles.SupportUsContainer} >
            <Head>
                <title>Support Us - {websiteDetails.fullName}</title>
            </Head>
            <Navigation logo={websiteDetails.logo} />
            <div className={Styles.mainContent}>
                {
                    upiAddress
                    ?
                    <>
                        <h1 className={Styles.headline} >Support journalism. Support free voice</h1>
                        <p className={Styles.subHeadline} >Independent journalism that speaks truth to power and is free of corporate and political control is possible only when people start contributing towards the same.</p>
                        <div className={Styles.qrCodeContainer}>
                            <QRCode value={`upi://pay?pa=${upiAddress}&pn=${websiteDetails.fullName}&mc=0000&mode=02&purpose=00`}   />
                            <p className={Styles.upiAddress}>{upiAddress}</p>
                        </div>
                    </>
                    :
                    <p><strong>{websiteDetails.fullName}</strong> has not updated there bank details.</p>
                }
                
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0];
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www') {
        subdomain = "newsazamgarh";
    }
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    const upiAddress = await fetchUPI(firebaseUID);
    return {
        props: {
            upiAddress,
            firebaseUID,
            websiteDetails
        }, // will be passed to the page component as props
    }
}

export default SupportUs;
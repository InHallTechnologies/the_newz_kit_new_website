import React, { useEffect, useState } from "react";
import fetchFirebaseUID, { fetchWebsiteDetails } from "../../backend/fetchFirebaseUID";
import Navigation from "../../components/Navigation.component";
import Styles from '../../styles/Classified.module.scss';
import router from 'next/router'
import { onValue, ref, set, push } from "firebase/database";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import SelectedOccasion from "../../components/SelectedOcaasionArch.component";
import { Divider } from "@mui/material";
import { GetOccasionList } from "../../backend/getOccasionList";
import OccasionList from "../../components/OccasionList.component";
import Footer from "../../components/Footer.component";
import Head from "next/head";

const Classified = ({ websiteDetails, firebaseUID, occasionList }) => {
    const [selectedOccasion, setSelectedOccasion] = useState({})
    const [title, setTitle] = useState("")

    useEffect(() => {
        handlePostSelection()
    }, [router.query.occasion_id])

    const handlePostSelection = () => {
        if (router.query.occasion_id) {
            const selectedOccasionRef = ref(firebaseDatabase, `NEWZKIT_ADS_ARCHIVE/GLOBAL/${router.query.occasion_id}`)
            onValue(selectedOccasionRef, snapshot => {
                if (snapshot.exists()) {
                    const post = snapshot.val();
                    setSelectedOccasion(post);
                    setTitle(`${post.type} ${post.occasionFor} | Classified | ${websiteDetails.fullName}`)
                }
            })
        }
    }

    const handleOccasionAction = (occasionId) => {
        console.log(occasionId)
        router.push(`/classified?occasion_id=${occasionId}`)
    }

    return(
        <div className={Styles.container}>
            <Head>
                {
                    title
                    ?
                    <title>{title}</title>
                    :
                    <title>NewzKit Classified</title>
                }
                
            </Head>
            <Navigation logo={websiteDetails.logo} />
            <SelectedOccasion occasion={ selectedOccasion } />
            <Divider sx={{marginTop:"10px"}}/>
            <OccasionList list={occasionList} handleOccasionAction={handleOccasionAction}  />
            <Footer />
        </div>
    )
}


export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
    if (subdomain === 'localhost:3000' || subdomain === 'thenewzkit' || subdomain === 'www'){
        subdomain = "NewzKit";
    }
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    const occasionList = await GetOccasionList();
    return {
        props: {
            websiteDetails, firebaseUID, occasionList
        }
    }
}
  


export default Classified
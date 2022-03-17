import { Button } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { firebaseDatabase } from '../../backend/firebaseHandler';
import Styles from '../../styles/AdsWithUs.module.scss';

const AdsWithUs = ({ categories_list, features_list }) => {

    const handleFillForm = () => {
        Router.push('/ads-with-us/fill-form')
    }

    return(
        <div className={Styles.container}>
            <div className={Styles.mainContent}>
                <Head>
                    <title>Advertise With Us - NewzKit</title>
                </Head>
                <img className={Styles.logo} src='/logo.png' />

                <div className={Styles.heroSpace} >
                    <div className={Styles.contentContainer}>
                        <h1 className={Styles.sectionTitle}>Growth and Emotions</h1>
                        <p className={Styles.contentText}>A local ad network that values relations and growth. With NewzKit ads, you get more value for money by serving ads in your local NewzKit powered websites. </p>
                        <Button onClick={handleFillForm} variant="contained" sx={{ marginTop:"20px" }} >Get Started</Button>
                    </div>

                    <div className={Styles.heroIllustrationContainer} >
                        <img className={Styles.heroIllustration} src='/ads-hero.webp' />
                    </div>
                </div>

                <div className={Styles.categoryContainer}>
                    <h1 className={Styles.sectionTitle} >Different category, different approach</h1>
                    <p className={Styles.contentText}>We understand different fields require different ad strategies.</p>

                    <div className={Styles.contentList}>
                        {
                            categories_list.map(item => {
                                return(
                                    <div className={Styles.categoriesItemContainer} key={item.name}>
                                        <img className={Styles.categoriesIcon} src={item.icon} />
                                        <p className={Styles.categoriesName}>{item.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={Styles.featuresContainer}>
                    <h1 className={Styles.sectionTitle} >Checkout the features</h1>
                    <div className={Styles.contentList}>
                        {
                            features_list.map(item => {
                                return(
                                    <div className={Styles.categoriesItemContainer} key={item.name}>
                                        <img className={Styles.categoriesIcon} src={item.icon} />
                                        <p className={Styles.categoriesName}>{item.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <footer className={Styles.footerContainer}>
                <p>Copyright © All rights reserved</p>
            </footer>
        </div>
    )
}


export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0];
    if (subdomain === 'localhost:3000' || subdomain === 'thenewzkit' || subdomain === 'www'){
        subdomain = "home";
    }
    
    const responsePromise = landingPageDetails();
    const response = await responsePromise.then();
    const { categories_list, features_list } = response

    return {
        props: {
            categories_list, features_list
        },
    };
}


const landingPageDetails = () => {
    const promise = new Promise((resolve, reject) => {
        const landingPageRef = ref(firebaseDatabase, "ADS_LANDING_PAGE_DETAILS")
        onValue(landingPageRef, (Snapshot) => {
            if (Snapshot.exists()) {
                const value = Snapshot.val();
                const categoriesList = value['CATEGORIES_LIST']
                const featuresList = value['FEATURES_LIST']
                const temp = [...categoriesList, ...categoriesList, ...categoriesList, ...categoriesList, ...categoriesList, ...categoriesList ]
                resolve({
                    categories_list: temp,
                    features_list: [...featuresList,...featuresList,...featuresList,...featuresList,...featuresList,]
                })
            }
        }, { onlyOnce: true })
    })

    return promise
}

export default AdsWithUs;
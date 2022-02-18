import { Button } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import CategoryListContainer from '../../components/CategoryListContianer.component';
import Navigation from '../../components/Navigation.component';
import PostArch from '../../components/PostArch.component';
import Styles from '../../styles/CategoryWisePosts.module.scss';

const CategoryWisePosts = ({ category, data, websiteDetails }) => {
    
   

    return (
        <div className={Styles.categoryWisePostsContainer}>
            <Head>
                <title>{category} - {websiteDetails.fullName} {websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}</title>
            </Head>
            <Navigation logo={websiteDetails.logo} />
            <div className={Styles.content}>
                <CategoryListContainer selectedCategories={websiteDetails.selectedCategories} />

                <div className={Styles.mainContent}>
                    <h1>{category} News</h1>

                    <div className={Styles.contentList} >
                        {
                            data.map(item => <PostArch key={item.postId} item={item} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www'){
        subdomain = "newsazamgarh";
    }
	const url = `https://www.themasalakhabar.com/api/category_wise_posts?category=${context.query.category}&subdomain=${subdomain}`;
	const dataResponse = await fetch(url);
	const data = await dataResponse.json();
	
    return {
        props: {
			category: context.query.category,
            data:data.data,
            websiteDetails: data.websiteDetails
		} 
    };
}


export default CategoryWisePosts;
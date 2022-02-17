import { Button } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import Navigation from '../../components/Navigation.component';
import PostArch from '../../components/PostArch.component';
import Styles from '../../styles/CategoryWisePosts.module.scss';

const CategoryWisePosts = ({ category, data, websiteDetails }) => {
    
    const handleCategorySelect = (category) => {
        Router.push(`/${category}`)
    }

    return (
        <div className={Styles.categoryWisePostsContainer}>
            <Head>
                <title>{category} - {websiteDetails.fullName} {websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}</title>
            </Head>
            <Navigation logo={websiteDetails.logo} />
            <div className={Styles.content}>
                <div className={Styles.categoriesList}>
                        {
                            websiteDetails.selectedCategories.map(item => <Button onClick={_ => handleCategorySelect(item)} variant={item === category?'outlined':'text'} key={item} sx={{marginRight:'10px', fontSize:'0.8rem', color:'black', minWidth:'110px'}} >{item}</Button>)
                        }
                </div>

                <div className={Styles.mainContent}>
                    <h1>{category} News</h1>

                    <div className={Styles.contentList} >
                        {
                            data.map(item => <PostArch key={item.postId} item={item}  />)
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
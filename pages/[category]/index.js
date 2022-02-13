import { Button } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import Navigation from '../../components/Navigation.component';
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
                            data.map(item => {
                                return (
                                    <Link passHref key={item.postId} href={`https://${item.channelName}.thenewzkit.com/${item.category}/${item.slug?item.slug:item.postId}`}>
                                        <div className={Styles.categoryItem} >
                                            <p className={Styles.category}>{item.category}</p>
                                            <img className={Styles.categoryItemImage} src={item.bannerPhoto} alt={item.bannerName ? item.bannerName: item.headline} />
                                            <h3 className={Styles.headline}>{item.headline.substring(0, 100)}...</h3>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
	const url = `http://localhost:3000/api/category_wise_posts?category=${context.query.category}&subdomain=${subdomain}`;
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
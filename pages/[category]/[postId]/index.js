import { CircularProgress, Divider } from '@mui/material';
import { get, limitToLast, query, ref } from 'firebase/database';
import Head from 'next/head';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { firebaseDatabase } from '../../../backend/firebaseHandler';
import Footer from '../../../components/Footer.component';
import Navigation from '../../../components/Navigation.component';
import PostArch from '../../../components/PostArch.component';
import Styles from '../../../styles/ViewPostPage.module.scss';

const ViewPostPage = ({websiteDetails, post, postId, category, firebaseUID}) => {
    const [crimeNewsList, setCrimeNewsList] = useState([]);
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const { headline, bannerName, bannerPhoto, content } = post;
  
    const fetchCategoryNews = async () => {
        const categoryNewsRef = ref(firebaseDatabase, `CATEGORY_WISE_POSTS/${firebaseUID}/${category}`);
        const categoryNewsQuery = query(categoryNewsRef, limitToLast(10));
        const categoryNewsSnapshot = await get(categoryNewsQuery);
        if (categoryNewsSnapshot.exists()) {
            const data = [];
            for (const key in categoryNewsSnapshot.val()) {
                const post = categoryNewsSnapshot.child(key).val();
                data.push(post)
            }
            data.reverse()
            setCrimeNewsList(data);
            
        }
        setLoading(false);
    }

    const fetchLatestpost = async () => {
        const latestNewsRef = ref(firebaseDatabase, `POST_ARCHIVE/${firebaseUID}`);
        const latestPostQuery = query(latestNewsRef, limitToLast(10));
        const latestPostSnapshot = await get(latestPostQuery);
        if (latestPostSnapshot.exists()) {
            const data = [];
            for (const key in latestPostSnapshot.val()) {
                const post = latestPostSnapshot.child(key).val();
                data.push(post);
            }
            setLatestPost(data);
        }
    }
    
    useEffect(() => {
       fetchCategoryNews();
       fetchLatestpost();
    }, []);


    const handleClick = (item) => {
        router.push(`/${item.category}/${item.slug?item.slug:item.postId}`);
    }


    return (
        <div className={Styles.ViewPostPageContainer} >
            <Head>
                <title>{headline} | {category} | {websiteDetails.fullName}</title>
            </Head>
            <header>
                <Navigation logo={websiteDetails.logo} />
            </header>
            <main>
                <div className={Styles.viewPostContent}>
                    <div className={Styles.mainPost}>
                        <h1 className={Styles.headline} >{headline}</h1>
                        <img className={Styles.mainPostImage} src={bannerPhoto} alt={bannerName?bannerName:headline} />
                        <div className={Styles.contentContainer} dangerouslySetInnerHTML={{__html:content}}>

                        </div>
                    </div>

                   <div className={Styles.dividerContainer} >
                    <Divider />
                   </div>
                    
                    <div className={Styles.similarCategoryNewsListContainer} >
                        <h2 className={Styles.moreFromCategoryLabel} >More {category} News</h2>
                        <div className={Styles.moreCategoryList}>
                            {
                                loading
                                ?
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'20px 0'}} >
                                    <CircularProgress size='20px' />
                                </div>
                                :
                                null
                            }
                            {
                                crimeNewsList.map(item => {
                                    return (
                                        <div key={item.postId}>
                                            <div className={Styles.latestListArch}  onClick={ _ => handleClick(item)} >
                                                <img className={Styles.latestImage} src={item.bannerPhoto} alt={item.bannerName ? item.bannerName: item.headline} />
                                                <h2 className={Styles.latestHeadline} >{item.headline}</h2>
                                            </div>
                                            <div className={Styles.dividerContainer} >
                                                <Divider sx={{margin: "10px 0"}} />
                                            </div>
                                           
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Divider sx={{marginTop:'20px'}} />
                <div className={Styles.latestNewsContainer}>
                    <h2 className={Styles.latestPostLabel}>Latest News</h2>
                    <div className={Styles.latestPostList} >
                        {
                            latestPost.map(item => <PostArch key={item.postId} item={item} />)
                        }
                    </div>
                </div>
                
            </main>
            <Footer />
        </div>
    )
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www'){
        subdomain = "newsazamgarh";
    }
    const { category, postId } = context.query
    const fetchURL = `https://www.themasalakhabar.com/api/fetch_post?subdomain=${subdomain}&category=${category}&postId=${postId}`
    const response = await fetch(fetchURL);
    const responseData = await response.json();
    const { websiteDetails, post, firebaseUID } = responseData;
    return {
      props: {websiteDetails, post, postId, category, firebaseUID},
    }
  }
  

export default ViewPostPage;
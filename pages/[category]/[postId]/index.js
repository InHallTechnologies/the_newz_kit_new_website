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
import CategoryListContainer from '../../../components/CategoryListContianer.component'

const ViewPostPage = ({websiteDetails, post, postId, category, firebaseUID}) => {
    const [crimeNewsList, setCrimeNewsList] = useState([]);
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const { headline, bannerName, bannerPhoto, content, reporterName, postReleaseDate, postReleaseTime } = post;
    console.log(post);

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
        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
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
                <div className={Styles.categoryListContainer}>
                    <CategoryListContainer selectedCategories={websiteDetails.selectedCategories}  />
                </div>

                <div className={Styles.viewPostContent}>
                    <div className={Styles.mainPost}>
                        <h1 className={Styles.headline} >{headline}</h1>
                        <div className={Styles.reporterContainer}>
                            <p style={{color:'#E9494B', marginRight:'15px', fontWeight:'bold'}} >{reporterName? `${reporterName} ` : `Reporter `}</p>

                            <p style={{color:'#444'}}>{postReleaseDate}</p>
                            <p style={{marginLeft:'15px', color:'#444'}}>{postReleaseTime} IST</p>
                        </div>
                        <img className={Styles.mainPostImage} src={bannerPhoto} alt={bannerName?bannerName:headline} />
                        <div className={Styles.contentContainer} dangerouslySetInnerHTML={{__html:content}}>

                        </div>
                    </div>

                    <div className={Styles.segmentDividerContainer} >
                        <Divider />
                    </div>

                    <div className={Styles.similarCategoryNewsListContainer} >
                        <ins className="adsbygoogle"
                             style={{display:"block", textAlign:'center', marginBottom:'20px'}}
                             data-ad-layout="in-article"
                             data-ad-format="fluid"
                             data-ad-client="ca-pub-2505151384138527"
                             data-ad-slot="3697455905"></ins>
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
                                                <div>
                                                    <h2 className={Styles.latestHeadline} >{item.headline.substring(0, 90)} ...</h2>
                                                    <div className={Styles.latestReporterContainer}>
                                                        <p style={{color:'#E9494B', marginRight:'15px', fontWeight:'bold', fontSize:'0.9rem'}} >{item.reporterName? `${item.reporterName} ` : `Reporter `}</p>
                                                        <p style={{color:'#444', fontSize:'0.8rem'}}>{item.postReleaseDate}</p>
                                                    </div>
                                                </div>

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
    const fetchURL = `https://www.thenewzkit.com/api/fetch_post?subdomain=${subdomain}&category=${category}&postId=${postId}`
    const response = await fetch(fetchURL);
    const responseData = await response.json();
    const { websiteDetails, post, firebaseUID } = responseData;
    return {
        props: {websiteDetails, post, postId, category, firebaseUID},
    }
}


export default ViewPostPage;
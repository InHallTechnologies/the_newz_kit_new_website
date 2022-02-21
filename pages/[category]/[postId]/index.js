import { CircularProgress, Divider } from '@mui/material';
import { get, limitToLast, query, ref } from 'firebase/database';
import Head from 'next/head';
import router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { firebaseDatabase } from '../../../backend/firebaseHandler';
import Footer from '../../../components/Footer.component';
import Navigation from '../../../components/Navigation.component';
import PostArch from '../../../components/PostArch.component';
import Styles from '../../../styles/ViewPostPage.module.scss';
import CategoryListContainer from '../../../components/CategoryListContianer.component'
import { uuid } from 'uuidv4';
import Context from '../../../context/appContext';
import logView from '../../../backend/logView';

const ViewPostPage = ({websiteDetails, post, postId, category, firebaseUID}) => {
    const [crimeNewsList, setCrimeNewsList] = useState([]);
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const { headline, bannerName, bannerPhoto, content, reporterName, postReleaseDate, postReleaseTime } = post;
    const [contentDescription, setContentDescription] = useState('');
    const [sessionId, setSessionId] = useContext(Context);

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


        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
    }

    useEffect(() => {
        fetchCategoryNews();
        fetchLatestpost();
        
        if (!sessionId) {
            const uid = uuid()
            setSessionId(uid);
        }

    
        let tmp = document.createElement("DIV");
        tmp.innerHTML = content;
        setContentDescription(`${tmp.innerText.substring(0, 100)} ...`)

    }, []);

    useEffect(() => {
        if (sessionId) {
            logView(post.slug?post.slug:post.postId, sessionId);
        }
    }, [sessionId, post])

    

    const handleClick = (item) => {
        router.push(`/${item.category}/${item.slug?item.slug:item.postId}`);
    }

    

    return (
        <div className={Styles.ViewPostPageContainer} >
            <Head>
                <title>{headline} | {category} | {websiteDetails.fullName}</title>
                <meta property="og:url"                content={`https://${websiteDetails.name}.thenewzkit.com/${category}/${post.slug?post.slug:post.postId}`} />
                <meta property="og:type"               content="article" />
                <meta property="og:title"              content={`${headline} | ${category} | ${websiteDetails.fullName}`} />
                <meta property="og:description"        content={contentDescription} />
                <meta property="og:image"              content={post.bannerPhoto} />
                <link id="favicon" rel="shortcut icon" type="image/png" href={websiteDetails.logo} />
            </Head>
            <header>
                <Navigation logo={websiteDetails.logo} />

            </header>
            
            <main>
                <div className={Styles.categoryListContainer}>
                    <CategoryListContainer selectedCategories={websiteDetails.selectedCategories}  />
                </div>

                <div className={Styles.homeAdsContainer}>
                    <ins className="adsbygoogle"
                         style={{display:'inline-block', margin:'20px auto',width:'350px', height:'90px', border:'1px solid black'}}
                         data-ad-client="ca-pub-2505151384138527"
                         data-ad-slot="1655269971"

                    />
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
                        <ins className="adsbygoogle"
                             style={{display:"block", textAlign:'center', marginTop:'20px'}}
                             data-ad-layout="in-article"
                             data-ad-format="fluid"
                             data-ad-client="ca-pub-2505151384138527"
                             data-ad-slot="3697455905"></ins>
                    </div>
                </div>

                <Divider sx={{marginTop:'10px'}} />
                <div className={Styles.latestNewsContainer}>
                    <h2 className={Styles.latestPostLabel}>Latest News</h2>
                    <div className={Styles.latestPostList} >
                        {
                            latestPost.map((item, index) => {
                                return (
                                    <>
                                        <PostArch key={item.postId} item={item} />
                                        {
                                            index % 3 === 0
                                                ?
                                                <div align={'center'}>
                                                    <ins className="adsbygoogle"
                                                         style={{display:"inline-block",width:"250px",height:"250px"}}
                                                         data-ad-client="ca-pub-2505151384138527"
                                                         align='center'
                                                         data-ad-slot="9168079861"></ins>
                                                </div>
                                                :
                                                null
                                        }
                                    </>
                                )
                            })
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
    const { category, postId } = context.query;
    const fetchURL = `https://www.thenewzkit.com/api/fetch_post?subdomain=${subdomain}&category=${category}&postId=${postId}`
    // const fetchURL = `http://localhost:3000/api/fetch_post?subdomain=${subdomain}&category=${category}&postId=${postId}`
    const response = await fetch(fetchURL);
    const responseData = await response.json();
    const { websiteDetails, post, firebaseUID } = responseData;
    return {
        props: {websiteDetails, post, postId, category, firebaseUID},
    }
}


export default ViewPostPage;
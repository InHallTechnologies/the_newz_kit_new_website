import { CircularProgress, Divider } from '@mui/material';
import {get, limitToLast, query, ref, onValue, off} from 'firebase/database';
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
import handlePostSourceRegister, { postSourceTypes } from '../../../backend/handlePostSourceRegister';
import InArticleAds from '../../../components/InArticleAds.component';
import Comments from '../../../components/Comments.component';
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton, WhatsappIcon, FacebookIcon, TwitterIcon } from 'react-share'
import NewzKitAds from '../../../components/NewzKitAds.component';
import FloatingWhatsappButton from '../../../components/FloatingWhatsappButton.component';
import Link from 'next/link';


const ViewPostPage = ({websiteDetails, post, postId, category, firebaseUID, subdomain, description}) => {
    const [crimeNewsList, setCrimeNewsList] = useState([]);
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const { headline, bannerName, bannerPhoto, content, reporterName, postReleaseDate, postReleaseTime, type, videoUrl } = post;
    const [contentDescription, setContentDescription] = useState('');
    const [sessionId, setSessionId] = useContext(Context);
    const [currentUrl, setCurrentUrl] = useState();

    const fetchCategoryNews = async () => {
        const categoryNewsRef = ref(firebaseDatabase, `CATEGORY_WISE_POSTS/${firebaseUID}/${category}`);
        const categoryNewsQuery = query(categoryNewsRef, limitToLast(10));
        const promise = new Promise((resolve, reject) => {
            onValue(categoryNewsQuery,async (categoryNewsSnapshot) => {
                if (categoryNewsSnapshot.exists()) {
                    const data = [];
                    for (const key in categoryNewsSnapshot.val()) {
                        const post = categoryNewsSnapshot.child(key).val();
                        data.push(post)
                    }
                    data.reverse()
                    resolve(data);
                    // setCrimeNewsList(data);

                }

                setLoading(false);
            }, {onlyOnce:true});
        })

        const data = await promise.then();
        setCrimeNewsList(data);


    }

    const fetchLatestpost = async () => {
        const latestNewsRef = ref(firebaseDatabase, `POST_ARCHIVE/${firebaseUID}`);
        const latestPostQuery = query(latestNewsRef, limitToLast(10));
        onValue(latestPostQuery, async (latestPostSnapshot) => {
            if (latestPostSnapshot.exists()) {
                const data = [];
                for (const key in latestPostSnapshot.val()) {
                    const post = latestPostSnapshot.child(key).val();
                    data.push(post);
                }

                setLatestPost(data);
            }
        }, { onlyOnce:true })



        var ads = document.getElementsByClassName("adsbygoogle").length;
        console.log(ads)
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
    }

    useEffect(() => {
        setCurrentUrl(`https://${subdomain}.thenewzkit.com/${post.category}/${post.slug?post.slug:post.postId}`)

        fetchCategoryNews();
        fetchLatestpost();
        
        if (!sessionId) {
            const uid = uuid()
            setSessionId(uid);
        }

        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }

    
        let tmp = document.createElement("DIV");
        tmp.innerHTML = content;
        setContentDescription(`${tmp.innerText.substring(0, 100)} ...`)

    }, []);

    useEffect(() => {
        if (sessionId) {
            handlePostSourceRegister(websiteDetails.uid, postSourceTypes.STORY, post);
            logView(post.slug?post.slug:post.postId, sessionId, post.postId);
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
                <meta property="og:description"        content={description} />
                <meta property="og:image"              content={post.bannerPhoto} />
                <meta property="description"        content={description} />
                <link id="favicon" rel="shortcut icon" type="image/png" href={websiteDetails.logo} />
            </Head>
            <header>
                <Navigation aboutUs={websiteDetails.aboutUs} logo={websiteDetails.logo} whatsappGroupUrl={websiteDetails.whatsappGroupUrl} />
            </header>
            
            <main>
                <div className={Styles.categoryListContainer}>
                    <CategoryListContainer selectedCategories={websiteDetails.selectedCategories}  />
                </div>

                <div align="center" className={Styles.homeAdsContainer}>
                    {/* <div style={{minHeight:"300px"}} id="M775976ScriptRootC1290883"></div> */}
                    <ins className="adsbygoogle"
                        style={{display:'block'}}
                        data-ad-client="ca-pub-2505151384138527"
                        data-ad-slot="9623915408"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                

                <div className={Styles.viewPostContent}>
                    <div className={Styles.mainPost}>
                        <h1 className={Styles.headline} >{headline}</h1>
                        <div className={Styles.reporterContainer}>
                            <p style={{color:'#E9494B', marginRight:'15px', fontWeight:'bold'}} >{reporterName? `${reporterName} ` : `Reporter `}</p>

                            <p style={{color:'#444'}}>{postReleaseDate}</p>
                            <p style={{marginLeft:'15px', color:'#444'}}>{postReleaseTime} IST</p>
                        </div>
                        
                        <div>
                            <WhatsappShareButton url={`https://${subdomain}.thenewzkit.com/ads-with-us/fill-form`} title={post.headline+`\n${currentUrl}\n.\n.\n.\n${websiteDetails.fullName} पर विज्ञापन दें और अपना प्रचार अपने शहर वासियों के फोन पर पहुंचाएं।\n`}  >
                                <WhatsappIcon size={30}  />
                            </WhatsappShareButton>

                            <FacebookShareButton style={{margin:'5px 10px'}} quote={post.headline+`\n\n${websiteDetails.fullName} पर विज्ञापन दें और अपना प्रचार अपने शहर वासियों के फोन पर पहुंचाएं।\nhttps://${subdomain}.thenewzkit.com/ads-with-us/fill-form`} url={currentUrl}  >
                                <FacebookIcon size={30}  />
                            </FacebookShareButton>

                            <TwitterShareButton  quote={post.headline+`\n\n${websiteDetails.fullName} पर विज्ञापन दें और अपना प्रचार अपने शहर वासियों के फोन पर पहुंचाएं।\nhttps://${subdomain}.thenewzkit.com/ads-with-us/fill-form`} url={currentUrl}  >
                                <TwitterIcon size={30}  />
                            </TwitterShareButton>
                            
                        </div>

                        {
                            type === 'YOUTUBE'
                            ?
                            <iframe className={Styles.mainPostImage} src={`https://www.youtube.com/embed/${videoUrl.split('/')[3]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            :
                            <img className={Styles.mainPostImage} src={bannerPhoto} alt={bannerName?bannerName:headline} />

                        }
                        <div className={Styles.contentContainer} dangerouslySetInnerHTML={{__html:content}}>

                        </div>

                        <ins className="adsbygoogle"
                        style={{display:'block', marginTop:'20px'}}
                        data-ad-client="ca-pub-2505151384138527"
                        data-ad-slot="9623915408"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                        
                        <Comments fullName={websiteDetails.fullName} currentUrl={currentUrl} postId={post.postId} post={post} subdomain={subdomain} firebaseUID={firebaseUID} />
                        
                        <div align="center" className={Styles.homeAdsContainer}>
                            {/* <div style={{minHeight:"300px"}} id="M775976ScriptRootC1290883"></div> */}
                            <ins className="adsbygoogle"
                            style={{display:'block'}}
                            data-ad-format="autorelaxed"
                            data-ad-client="ca-pub-2505151384138527"
                            data-ad-slot="2240995234"></ins>
                        </div>

                        <div className={Styles.homeAdsContainer}>
                            <div style={{minHeight:"300px"}} id="M775976ScriptRootC1290883"></div>
                        </div>

                        
                    </div>

                    

                    <div className={Styles.segmentDividerContainer} >
                        <Divider />
                       
                    </div>

                    <div className={Styles.similarCategoryNewsListContainer} >

                       

                        <ins className="adsbygoogle"
                             style={{display:"block", textAlign:'center', marginBottom:'20px', marginTop:'10px'}}
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
                                        <Link key={item.postId} passHref href={`/${item.category}/${item.slug?item.slug:item.postId}`}>
                                            <a style={{color:'#222', textDecoration:'none'}}>
                                                <div className={Styles.latestListArch}>
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
                                                <InArticleAds />
                                                <div className={Styles.dividerContainer} >
                                                    <Divider sx={{margin: "10px 0"}} />
                                                </div>
                                            </a>
                                        </Link>
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
                <div align="center" className={Styles.homeAdsContainer}>
                    {/* <div style={{minHeight:"300px"}} id="M775976ScriptRootC1290883"></div> */}
                    <NewzKitAds />
                    <ins className="adsbygoogle"
                        style={{display:'block',marginTop:'10px'}}
                        data-ad-client="ca-pub-2505151384138527"
                        data-ad-slot="9623915408"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                <div className={Styles.latestNewsContainer}>
                    <h2 className={Styles.latestPostLabel}>Latest News</h2>
                    <div className={Styles.latestPostList} >
                        {
                            latestPost.map((item, index) => {
                                return (
                                    <>
                                        <PostArch key={item.postId} item={item} />  
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
               
                {/* <div style={{width:'95%', margin:'0 auto'}} id="M775976ScriptRootC1290887"></div> */}
                <FloatingWhatsappButton whatsappGroupUrl={websiteDetails.whatsappGroupUrl} />
            </main>
            <Footer />
           
        </div>
    )
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0];
    if (subdomain === 'localhost:3000' || subdomain === 'thenewzkit' || subdomain === 'www'){
        subdomain = "NewzKit";
    }
    const { category, postId } = context.query;
    const fetchURL = `https://www.thenewzkit.com/api/fetch_post?subdomain=${subdomain}&category=${category}&postId=${postId}`
    // const fetchURL = `http://localhost:3000/api/fetch_post?subdomain=${subdomain}&category=${category}&postId=${postId}`
    const response = await fetch(fetchURL);
    const responseData = await response.json();
  
    const { websiteDetails, post, firebaseUID } = responseData;
    const content = post.content.replace(/(<([^>]+)>)/gi, "").substring(0, 150);
   
    return {
        props: {websiteDetails, post, postId, category, firebaseUID, subdomain, description: `${content}...`},
    }
}


export default ViewPostPage;
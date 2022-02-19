import { Divider } from "@mui/material";
import React from "react";
import Styles from "../styles/HeroSpace.module.scss";
import router from 'next/router';
import CategoryListContainer from "./CategoryListContianer.component";


const HeroSpace = ({ latestData, selectedCategories }) => {
    const latestPost = latestData[0];
    
    const handleCategorySelect = (category) => {
        router.push(`/${category}`)
    }
   
    const handleClick = (data) => {
        router.push(`${data.category}/${data.slug?data.slug:data.postId}`)
    }

    return (
        <div className={Styles.heroSpaceContainer}>
           <CategoryListContainer selectedCategories={selectedCategories} />
            <div className={Styles.contentContainer} >
                <div className={Styles.latestPostContainer} style={{ cursor:'pointer' }} onClick={ _ => handleClick(latestPost)}>
                    <img className={Styles.latestPostImage} src={latestPost.bannerPhoto} alt={latestPost.bannerName ? latestPost.bannerName: latestPost.headline} />
                    <div className={Styles.latestPostContent} >
                        <p className={Styles.category}>{latestPost.category}</p>
                        <h2 className={Styles.headline} >{latestPost.headline}</h2>
                        <p className={Styles.content}>{latestData.content}</p>

                        <div className={Styles.reporterContainer}>
                            <p style={{color:'#E9494B', marginRight:'15px', fontWeight:'bold'}} >{latestPost.reporterName? `${latestPost.reporterName} ` : `Reporter `}</p>
                            
                            <p style={{color:'#444'}}>{latestPost.postReleaseDate}</p>
                            <p style={{marginLeft:'15px', color:'#444'}}>{latestPost.postReleaseTime} IST</p>
                        </div>
                    </div>
                </div>
                <div className={Styles.latestPostListContainer}>
                    <h2 className={Styles.sectionTitle}>Latest Posts</h2>
                    <div className={Styles.latestListContainer}>
                        {
                            latestData.map(item => {
                                return (
                                    <>
                                        <div className={Styles.latestListArch} key={item.postId} onClick={ _ => handleClick(item)} >
                                            <img className={Styles.latestImage} src={item.bannerPhoto} alt={item.bannerName ? item.bannerName: item.headline} />
                                            <div>
                                                <h2 className={Styles.latestHeadline} >{item.headline.substring(0, 90)} ...</h2>
                                                <div className={Styles.latestReporterContainer}>
                                                    <p style={{color:'#E9494B', marginRight:'15px', fontWeight:'bold', fontSize:'0.9rem'}} >{item.reporterName? `${item.reporterName} ` : `Reporter `}</p>
                                                    <p style={{color:'#444', fontSize:'0.8rem'}}>{item.postReleaseDate}</p>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <Divider sx={{margin: "10px 0"}} />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSpace;

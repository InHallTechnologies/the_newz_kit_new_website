import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Styles from "../styles/HeroSpace.module.scss";
import router from 'next/router';
import { ref, get } from 'firebase/database';
import { firebaseDatabase } from "../backend/firebaseHandler";

const HeroSpace = ({ latestData, selectedCategories }) => {
    const latestPost = latestData[0];
    
    const handleCategorySelect = (category) => {
        router.push(`/${category}`)
    }
   
    const handleClick = (data) => {
        window.open(`https://${data.channelName}.thenewzkit.com/${data.category}/${data.slug?data.slug:data.postId}`,"_blank")
    }

    return (
        <div className={Styles.heroSpaceContainer}>
            <div className={Styles.categoriesList}>
                    {
                        selectedCategories.map(item => <Button onClick={_ => handleCategorySelect(item)} key={item} sx={{marginRight:'10px', fontSize:'0.8rem', color:'black', minWidth:'110px'}} >{item}</Button>)
                    }
            </div>
            <div className={Styles.contentContainer} >
                <div className={Styles.latestPostContainer} style={{ cursor:'pointer' }} onClick={ _ => handleClick(latestPost)}>
                    <img className={Styles.latestPostImage} src={latestPost.bannerPhoto} alt={latestPost.bannerName ? latestPost.bannerName: latestPost.headline} />
                    <div className={Styles.latestPostContent} >
                        <p className={Styles.category}>{latestPost.category}</p>
                        <h2 className={Styles.headline} >{latestPost.headline}</h2>
                        <p className={Styles.content}>{latestData.content}</p>

                        <p className={Styles.releasedOnLabel}>Published On: {latestPost.postReleaseDate}</p>
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
                                            <h2 className={Styles.latestHeadline} >{item.headline}</h2>
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

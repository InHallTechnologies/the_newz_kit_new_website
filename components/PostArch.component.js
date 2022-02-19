import React from 'react';
import Styles from '../styles/PostArch.module.scss';
import router from 'next/router';
import { Divider } from '@mui/material';

const PostArch = ({ item, }) => {

    const visitPost = (item) => {
        console.log(`${item.category}/${item.slug?item.slug:item.postId}`);
        router.push(`/${item.category}/${item.slug?item.slug:item.postId}`);
    }

    return (
        <div key={item.postId} className={Styles.categoryItem} onClick={_ => visitPost(item)} >
            <p className={Styles.category}>{item.category}</p>
            <img className={Styles.categoryItemImage} src={item.bannerPhoto} alt={item.bannerName ? item.bannerName: item.headline} />
           
            <h3 className={Styles.headline}>{item.headline?item.headline.substring(0, 90): ""}...</h3>
            <div className={Styles.latestReporterContainer}>
                <p style={{color:'#E9494B', marginRight:'15px', fontWeight:'bold', fontSize:'0.9rem'}} >{item.reporterName? `${item.reporterName} ` : `Reporter `}</p>
                <p style={{color:'#444', fontSize:'0.8rem'}}>{item.postReleaseDate}</p>
            </div>
        </div>
    )
}

export default PostArch;
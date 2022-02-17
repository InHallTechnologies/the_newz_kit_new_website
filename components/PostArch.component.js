import React from 'react';
import Styles from '../styles/PostArch.module.scss';
import router from 'next/router';

const PostArch = ({ item, }) => {

    const visitPost = (item) => {
        console.log(`${item.category}/${item.slug?item.slug:item.postId}`);
        router.push(`/${item.category}/${item.slug?item.slug:item.postId}`);
    }

    return (
        <div key={item.postId} className={Styles.categoryItem} onClick={_ => visitPost(item)} >
            <p className={Styles.category}>{item.category}</p>
            <img className={Styles.categoryItemImage} src={item.bannerPhoto} alt={item.bannerName ? item.bannerName: item.headline} />
           
            <h3 className={Styles.headline}>{item.headline.substring(0, 100)}...</h3>
        </div>
    )
}

export default PostArch;
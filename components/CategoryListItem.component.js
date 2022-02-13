import React from 'react';
import Styles from '../styles/CategoryListItem.module.scss';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import router from 'next/router';

const CategoryListItem = ({ item }) => {

    const visitPost = (item) => {
        window.open(`https://${item.channelName}.thenewzkit.com/${item.category}/${item.slug?item.slug:item.postId}`);
    }

    const handleCategoryClick = (category) => {
        router.push(category)
    }
    
    if (item.data.length === 0) {
        return null;
    }
    return (
        <div className={Styles.categoriesListItemContainer}>
            <div className={Styles.titleContainer} >
                <h1 className={Styles.sectionTitle}>{item.name}</h1>
                <div className={Styles.viewAllContainer} onClick={_ => handleCategoryClick(item.name.replace(" News",""))} >
                    <p className={Styles.viewAllLabel}>View All</p>
                    <AiOutlineArrowRight className={Styles.arrowIcon} size={20} color='#E9494B' />
                </div>
            </div>
            <div className={Styles.categoryListItemList}>
                {
                    item.data.map(item => {
                        return (
                            <div key={item.postId} className={Styles.categoryItem} onClick={_ => visitPost(item)} >
                                <p className={Styles.category}>{item.category}</p>
                                <img className={Styles.categoryItemImage} src={item.bannerPhoto} alt={item.bannerName ? item.bannerName: item.headline} />
                               
                                <h3 className={Styles.headline}>{item.headline.substring(0, 100)}...</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CategoryListItem;
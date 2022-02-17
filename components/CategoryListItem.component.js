import React from 'react';
import Styles from '../styles/CategoryListItem.module.scss';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import router from 'next/router';
import PostArch from './PostArch.component';

const CategoryListItem = ({ item }) => {

   

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
                    item.data.map(item => <PostArch key={item.postId} item={item} />)
                }
            </div>
        </div>
    );
}

export default CategoryListItem;
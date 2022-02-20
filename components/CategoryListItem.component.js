import React, {useEffect} from 'react';
import Styles from '../styles/CategoryListItem.module.scss';
import { AiOutlineArrowRight } from 'react-icons/ai';
import router from 'next/router';
import PostArch from './PostArch.component';
import styles from "../styles/Home.module.css";

const CategoryListItem = ({ item }) => {

    useEffect(() => {
        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
    }, [])

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
            <div align={'center'} style={{margin:'50px 0'}} >
                <ins className="adsbygoogle"
                     style={{display:'block', marginTop:'20px'}}
                     data-ad-client="ca-pub-2505151384138527"
                     data-ad-slot="7050275925"
                     data-ad-format="auto"
                     align="center"
                     data-full-width-responsive="true"></ins>
            </div>
        </div>
    );
}

export default CategoryListItem;
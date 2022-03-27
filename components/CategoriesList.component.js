import React from "react";
import Styles from "../styles/CategoriesList.module.scss";
import CategoryListItem from "./CategoryListItem.component";
import NewzKitAds from '../components/NewzKitAds.component'

const CategoriesList = ({ list }) => {
    return (
        <div className={Styles.categoriesListContainer}>
            <NewzKitAds />
            {list.map((item) => {
                return (
                    <>
                        <CategoryListItem key={item.name} item={item} />
                    </>
                )
            } )}
        </div>
    );
};

export default CategoriesList;

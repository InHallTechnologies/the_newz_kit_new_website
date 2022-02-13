import React from "react";
import Styles from "../styles/CategoriesList.module.scss";
import CategoryListItem from "./CategoryListItem.component";

const CategoriesList = ({ list }) => {
    return (
        <div className={Styles.categoriesListContainer}>
            {list.map((item) => <CategoryListItem key={item.name} item={item} /> )}
        </div>
    );
};

export default CategoriesList;

import { Button } from "@mui/material";
import Router from "next/router";
import React from "react";
import Styles from "../styles/CategoryListContainer.module.scss";
import { BiHomeAlt } from 'react-icons/bi';

const CategoryListContainer = ({ selectedCategories }) => {

    const handleCategorySelect = (category) => {
        Router.push(`/${category}`)
    }

    return (
        <div className={Styles.categoriesList}>
           <div className={Styles.homeButtonContainer} onClick={_=> handleCategorySelect("")} >
               <BiHomeAlt size={20} color={'#000'} />
           </div>
            {selectedCategories.map((item) => (
                <Button
                    onClick={(_) => handleCategorySelect(item)}
                    key={item}
                    sx={{
                        marginRight: "10px",
                        fontSize: "0.8rem",
                        color: "black",
                        minWidth: "110px",
                        fontWeight:'bold'
                    }}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
};


export default CategoryListContainer;
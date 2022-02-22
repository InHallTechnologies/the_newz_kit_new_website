import { Button, Divider } from "@mui/material";
import React from "react";
import Styles from "../styles/Navigation.module.scss";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import Router from "next/router";
import MobileNavigation from "./MobileNavigation.component";

const Navigation = ({ logo }) => {
    
    let subdomain = "";
    try {
        if (window){
            subdomain = window.location.host;
            if (subdomain === 'localhost:3000' || subdomain === 'thenewzkit' || subdomain === 'www') {
                subdomain = "NewzKit";
            }
        }
    }catch(err){

    }

    console.log(subdomain);
    
    
    const handleHome = () => {
        Router.push("/");
    };

    return (
        <div className={Styles.navigationContainer}>
            <div className={Styles.topSection}>
                <div className={Styles.iconContainer} onClick={handleHome}>
                    <img
                        className={Styles.icon}
                        src={logo?logo:'/logo.png'}
                        alt="Newzy"
                    />
                </div>

                <div className={Styles.loginButtonContainer}>
                    <Button sx={{ marginRight: "20px" }} href='/privacy-policy' >Privacy Policy</Button>
                    <Button href="/contact-us" >Contact Us</Button>

                </div>
               <MobileNavigation logo={logo} />
            </div>
            <Divider />
            <div className={Styles.buttomSection}>
                <div className={Styles.loginButtonContainer}>
                    <BsFacebook
                        className={Styles.socialIcons}
                        size={20}
                        color="#444"
                    />
                    <BsTwitter
                        className={Styles.socialIcons}
                        size={20}
                        color="#444"
                    />
                    <BsYoutube
                        className={Styles.socialIcons}
                        size={20}
                        color="#444"
                    />
                </div>
                <div className={Styles.iconContainer}>
                    {
                        subdomain === "NewzKit"
                        ?
                        null
                        :
                        <Button href="/support-us" sx={{ marginLeft: "20px" }} variant='contained' >Support Us</Button>

                    }
                </div>
                <div className={Styles.changeLocation}>
                    {
                        subdomain === "NewzKit"
                        ?
                        null
                        :
                        <Button href="/support-us" variant={'contained'}  >Support Us</Button>
                    }
                    
                </div>
            </div>
            <Divider />
        </div>
    );
};

export default Navigation;

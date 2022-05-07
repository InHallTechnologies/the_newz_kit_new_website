import { Button, Divider } from "@mui/material";
import React from "react";
import Styles from "../styles/Navigation.module.scss";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import Router from "next/router";
import MobileNavigation from "./MobileNavigation.component";
import { FaWhatsappSquare } from 'react-icons/fa';


const Navigation = ({ logo, youtubeLink, facebookUrl, twitterUrl, whatsappGroupUrl, aboutUs }) => {
    
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
    
    
    const handleHome = () => {
        Router.push("/");
    };

    const handleSocialIcons = (link) => {
        Router.push(link)
    }

    const handleWhatsappGroup = () => {
        Router.push(whatsappGroupUrl)
    }


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
                      {
                      whatsappGroupUrl
                      ?
                      <Button onClick={handleWhatsappGroup} sx={{fontSize:"0.7rem", backgroundColor:'#25D366', marginRight:1}} variant='contained'  >
                        <FaWhatsappSquare color='#fff' size={20} style={{marginRight:5}} />
                        Join Whatsapp Group
                      </Button>
                      :
                      null
                    }
                    <Button sx={{ marginRight: "20px" }} href='/privacy-policy' >Privacy Policy</Button>
                    <Button sx={{ marginRight: aboutUs?"20px":"0px" }} href="/contact-us" >Contact Us</Button>
                    {
                        aboutUs
                        ?
                        <Button href="/about-us" >About Us</Button>
                        :
                        null
                    }
                   

                </div>
               <MobileNavigation logo={logo} whatsappGroupUrl={whatsappGroupUrl} />
            </div>
            <Divider />
            <div className={Styles.buttomSection}>
                <div className={Styles.loginButtonContainer}>
                    <BsFacebook
                        className={Styles.socialIcons}
                        size={20}
                        color="#444"
                        onClick={ _ => handleSocialIcons(facebookUrl)}
                    />
                    <BsTwitter
                        className={Styles.socialIcons}
                        size={20}
                        color="#444"
                        onClick={ _ => handleSocialIcons(twitterUrl)}
                    />
                    <BsYoutube
                        className={Styles.socialIcons}
                        size={20}
                        color="#444"
                        onClick={ _ => handleSocialIcons(youtubeLink)}
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

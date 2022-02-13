import { Button, Divider } from "@mui/material";
import React from "react";
import Styles from "../styles/Navigation.module.scss";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import Router from "next/router";
import LocationAlert from "./LocationAlert.component";
import MobileNavigation from "./MobileNavigation.component";

const Navigation = ({ logo }) => {
    const handleHome = () => {
        Router.push("/");
    };

    return (
        <div className={Styles.navigationContainer}>
            <div className={Styles.topSection}>
                <div className={Styles.iconContainer} onClick={handleHome}>
                    <img
                        className={Styles.icon}
                        src={logo}
                        alt="Newzy"
                    />
                </div>

                <div className={Styles.loginButtonContainer}>
                    <Button sx={{ marginRight: "20px" }}>Privacy Policy</Button>
                    <Button>Contact Us</Button>

                </div>
               <MobileNavigation />
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
                    <Button sx={{ marginLeft: "20px" }} variant='contained' >Donate</Button>
                </div>
                <div className={Styles.changeLocation}>
                    <LocationAlert noMargin />
                </div>
            </div>
            <Divider />
        </div>
    );
};

export default Navigation;

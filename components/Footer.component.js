import React from 'react';
import Styles from '../styles/Footer.module.scss';
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import Link from 'next/link';


const Footer = ({style}) => {

    return (
        <footer style={style} className={Styles.footerContainer}>
            <div className={Styles.topContainer}>
                <div className={Styles.socialIconsContainer}>
                    <BsFacebook size={25} color="#fff" />
                    <BsTwitter size={25} color="#fff" style={{margin: "0 20px"}} />
                    <BsYoutube size={25} color="#fff" />
                </div>
                <div className={Styles.actionContainer}>
                    <Link href='#' >
                        <p style={{cursor:'pointer'}} >Terms of Use</p>
                    </Link>
                    <p style={{margin:'0px 10px'}}>•</p>
                    <Link href='#' >
                        <p style={{cursor:'pointer'}}>Privacy Policy</p>
                    </Link>
                    <p style={{margin:'0px 10px'}}>•</p>
                    <Link href='#' >
                        <p style={{cursor:'pointer'}}>Contact Us</p>
                    </Link>
                </div>
                <div className={Styles.copyrightContainer}>
                    <p>
                        &copy; Copyright 2018, Obuv Network Private Limited
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
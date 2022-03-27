import React from 'react';
import Styles from '../styles/Footer.module.scss';
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import Link from 'next/link';
import Router from 'next/router';


const Footer = ({style}) => {

    return (
        <footer style={style} className={Styles.footerContainer}>
            <div className={Styles.topContainer}>
                <div className={Styles.socialIconsContainer}>
                    <BsFacebook size={25} color="#fff" onClick={_ => Router.push('https://www.facebook.com/thenewzkit')} />
                    <BsTwitter size={25} color="#fff" style={{margin: "0 20px"}} onClick={_ => Router.push('https://twitter.com/thenewzkit')} />
                    <BsYoutube size={25} color="#fff" />
                </div>
                <div className={Styles.actionContainer}>
                    <Link href='#' >
                        <p style={{cursor:'pointer'}} >Terms of Use</p>
                    </Link>
                    <p style={{margin:'0px 10px'}}>•</p>
                    <Link href='/privacy-policy' >
                        <p style={{cursor:'pointer'}}>Privacy Policy</p>
                    </Link>
                    <p style={{margin:'0px 10px'}}>•</p>
                    <Link href='/contact-us' >
                        <p style={{cursor:'pointer'}}>Contact Us</p>
                    </Link>
                </div>
                <div className={Styles.copyrightContainer}>
                    <p>
                        Copyright © 2022. All rights reserved.
                    </p>
                    <p className={Styles.poweredBy} style={{textAlign:'center', marginTop:'10px'}}>Powered By <a className={Styles.hyperLink} href='https://www.thenewzkit.com'>NewzKit</a>  </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
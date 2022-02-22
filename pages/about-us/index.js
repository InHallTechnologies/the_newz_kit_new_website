import React from 'react';
import Styles from '../../styles/AboutUs.module.scss';
import Head from 'next/head'
import Script from 'next/script';

const AboutUs = () => {

    return(
        <div className={Styles.aboutUsContainer}>
            <Head>
                <title>About Us | NewzKit - Build News Website</title>
                <meta property="description"        content="We are a publishing platform for small news organizations. Our no-code platform allows independent journalists and local or small news organizations to launch news websites in just 3 simple steps." />

                <meta property="og:type"               content="website" />
                <meta property="og:title"              content="About Us | NewzKit - Build News Website" />
                <meta property="og:description"        content="We are a publishing platform for small news organizations. Our no-code platform allows independent journalists and local or small news organizations to launch news websites in just 3 simple steps." />
                <meta property="og:image"              content={"https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/Hints%2F1.png?alt=media&token=3dd168b5-6615-497f-aaed-3d42b7d1ef82"} />
                <meta property="og:image:width" content="630"></meta>
                <meta property="og:image:height" content="473"></meta>

                <meta property="twitter:title"  content={"About Us | NewzKit - Build News Website"} />
                <meta property="twitter:image"         content={"https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/Hints%2F1.png?alt=media&token=3dd168b5-6615-497f-aaed-3d42b7d1ef82"} />
                <meta property="twitter:description"   content={"We are a publishing platform for small news organizations. Our no-code platform allows independent journalists and local or small news organizations to launch news websites in just 3 simple steps."}/>
                <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                  crossOrigin="anonymous"
                />
            </Head>
            <header className={Styles.headerContainer}>
                <nav style={{width:'100%', backgroundColor:'white'}} className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img className={Styles.logo} src="/logo.png" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                < span className="navbar-toggler-icon"></span>
                </button>
                <div  className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul style={{marginLeft:'auto'}} className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">About Us</a>
                </li>
                </ul>
                 </div>
                </div>
                </nav>
            </header>

            <main className={Styles.mainContainer}>
                <div className={Styles.content}>
                    <h1 className={Styles.sectionTitle}>About Us</h1>
                    <p className={Styles.paraOne}>Our mission is to democratize media and strengthen its independence, and thus, empower democracy.</p>
                    <p className={Styles.paraTwo}>Our story starts during the COVID-19 pandemic. Among many businesses, it also destabilized the media industry. Newspapers, one of the biggest sources of authentic information, were suddenly forced to stop circulation in the wake of a nation-wide lockdown. However, big newspaper brands, which already had an online presence, were able to successfully transfer readership from offline to online. But small, local newspapers and periodicals had no way to take the information to their readers. For them, the adoption of the online medium seemed difficult and expensive. Firstly, because of the need of expensive developers to build a news website from scratch. Secondly, they had no experience to digitally distribute content, and thirdly, monetisation remained a problem. </p>
                    <p className={Styles.paraTwo}>So, our team of journalists, marketers and techies decided to give the right technology in the hands of local journalists and small news organizations. With Newzkit, they can now go online in 3 simple steps without anyone’s help. And, we help them in content distribution and monetisation as well.</p>
                </div>

                <div className={Styles.illustrationContainer}>
                    <img className={Styles.illustration} src={'/aboutusillus.svg'} alt="About NewzKit" />
                </div>
            </main>
            <footer className={Styles.footer}>
                <div>
                    <p>Copyright © All rights reserved</p>
                </div>
            </footer>
            <Script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></Script>

            <Script
              src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
              crossorigin></Script>
            <Script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossorigin></Script>
                
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></Script>

        </div>
    )
}

export default AboutUs;
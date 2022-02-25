import Head from 'next/head'
import Styles from '../styles/Home.module.css'
import { RiFocus2Line, RiCommunityFill } from 'react-icons/ri';
import { FaPhotoVideo } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { BsFillLayersFill } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Button } from "@mui/material";
import router from 'next/router'
import Script from 'next/script';
import Link from 'next/link'


export default function HomePage({ list }) {

  const handleDashboard = () => {
    router.push('https://dashboard.thenewzkit.com/')
  }

  const handleVisitLink = (item) => {
    window.open(`https://${item.name}.thenewzkit.com/`, '_blank')
    // router.push(`https://${item.name}.thenewzkit.com/`)
  }


  return (
    <div className={Styles.container} style={{maxWidth:'90%'}} >
      <Head>
        <title>NewzKit - Build News Website</title>
        <meta property="description"        content="We are a publishing platform for small news organizations. Our no-code platform allows local or small news organizations and independent journalists to launch news websites in just 3 simple steps, via an app." />

        <meta property="og:type"               content="website" />
        <meta property="og:title"              content="NewzKit - Platform for News Outlets" />
        <meta property="og:description"        content="We are a publishing platform for small news organizations. Our no-code platform allows local or small news organizations and independent journalists to launch news websites in just 3 simple steps, via an app." />
        <meta property="og:image"              content={"https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/Hints%2F1.png?alt=media&token=3dd168b5-6615-497f-aaed-3d42b7d1ef82"} />
        <meta property="og:image:width" content="630"></meta>
        <meta property="og:image:height" content="473"></meta>

        <meta property="twitter:title"  content={"NewzKit - Platform for News Outlets"} />
        <meta property="twitter:image"         content={"https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/Hints%2F1.png?alt=media&token=3dd168b5-6615-497f-aaed-3d42b7d1ef82"} />
        <meta property="twitter:description"   content={"We are a publishing platform for small news organizations. Our no-code platform allows local or small news organizations and independent journalists to launch news websites in just 3 simple steps, via an app."}/>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        
        <link id="favicon" rel="shortcut icon" type="image/png" href={'/android-icon-36x36.png'} />
      </Head>

      <header className={Styles.headerContainer}>
        <nav style={{width:'100%', backgroundColor:'white'}} className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid" style={{padding:0}}>
          <Link className="navbar-brand" href="/">
            <img className={Styles.logo} src="/logo.png" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
        <div  className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul style={{marginLeft:'auto'}} className="navbar-nav">
            <li className="nav-item">
              <Button className="nav-link active" aria-current="page" href="/">Home</Button>
            </li>
            <li className="nav-item">
              <Button className="nav-link" href="#HowItWorks">How It Works</Button>
            </li>
            <li className="nav-item">
              <Button className="nav-link" href="about-us">About Us</Button>
            </li>

            <li className="nav-item">
              <Button className="nav-link" href="/contact-us">Contact Us</Button>
            </li>

            <li className="nav-item">
              <Button className="nav-link" href="/privacy-policy">Privacy Policy</Button>
            </li>

            <li className="nav-item">
              <Button className="nav-link" href="#Team">Team</Button>
            </li>
          </ul>
          </div>
        </div>
      </nav>
      </header>

      <main className={Styles.main}>
        <div className={Styles.mainContainer}>
          <div className={Styles.infoContainer}>
              <h1 className={Styles.tagline}>Publish. Monetize. Grow</h1>
              <p className={Styles.subLine}>We are a publishing platform for small news organizations. Our no-code platform allows local or small news organizations and independent journalists to launch news websites in just 3 simple steps.</p>
              <div className={Styles.heroActionContainer}>
                <a href='https://play.google.com/store/apps/details?id=com.obuv.thenewzkit&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                  <img  className={Styles.playStoreIcon} alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
                </a>
                <Button className={Styles.dashboardButton} onClick={handleDashboard} style={{backgroundColor:'black', borderColor:'black', color:'white', fontWeight:'bold', fontSize:'0.8rem', padding:"0px 10px"}} >Go to Dashboard</Button>
              </div>
          </div>

          <div className={Styles.illustrationContainer}>
            <img src='/illus.svg' alt="Newz Kit" className={Styles.mainIllustration} />
          </div>
        </div>

        <div className={Styles.howItWorksContainer} id="HowItWorks">
          <h2 className={Styles.sectionTitle}>How it works</h2>
          <p className={Styles.howItWorksContent}>NewzKit offers a complete solution for news outlets. It doesn’t require any code or plug-ins to launch a news website.</p>
          <div className={Styles.featuresListContainer}> 
            
            <div className={Styles.featureContainer}>
              <img className={Styles.fetureIcon} src='/web-design.png'  alt="Select Theme" />
              <h4 className={Styles.featureLabel}>Select Theme</h4>
              <p className={Styles.featureDef} >Choose the most appropriate theme from the collection</p>
            </div>

            <div className={Styles.featureContainer}>
              <img className={Styles.fetureIcon} src='/upload.png'  alt="Upload Content" />
              <h4 className={Styles.featureLabel}>Upload Content</h4>
              <p className={Styles.featureDef} >Upload your content, select or upload photos and videos</p>
            </div>


            <div className={Styles.featureContainer}>
              <img className={Styles.fetureIcon} src='/publish.png'  alt="Publish" />
              <h4 className={Styles.featureLabel}>Publish</h4>
              <p className={Styles.featureDef} >Submit to launch your news website</p>
            </div>
          </div>
        </div>

        <div className={Styles.packageListContainer}>
          <h2 className={Styles.sectionTitle}>A Complete Package</h2>
          <p className={Styles.howItWorksContent}>We are not just a website builder but solves the problem of monetization, user reach, and provide a complete solution required for a news publisher.</p>
          <div className={Styles.packageListsContent} >
            
            <div className={Styles.packageContainer}>
              <RiFocus2Line size={50} color='black' />
              <h4 className={Styles.packageLabel}>News Focused</h4>
              <p className={Styles.packageFeatureDef} >From design to themes, the platform is focused on news publishers</p>
            </div>

            <div className={Styles.packageContainer}>
              <FaPhotoVideo size={50} color='black' />
              <h4 className={Styles.packageLabel}>Optimized Photos</h4>
              <p className={Styles.packageFeatureDef} >Thousands of photos available for use of news publishers</p>
            </div>

            <div className={Styles.packageContainer}>
              <GiProgression size={50} color='black' />
              <h4 className={Styles.packageLabel}>Inbuilt SEO Tool</h4>
              <p className={Styles.packageFeatureDef} >It checks images for alt tag that matches the primary keyword, and also checks content and meta description length</p>
            </div>

            <div className={Styles.packageContainer}>
              <AiFillPlayCircle size={50} color='black' />
              <h4 className={Styles.packageLabel}>Social Media tools</h4>
              <p className={Styles.packageFeatureDef} >It allows users to schedule publishing of news stories on social media platforms like Facebook, Twitter and WhatsApp</p>
            </div>

            <div className={Styles.packageContainer}>
              <BsFillLayersFill size={50} color='black' />
              <h4 className={Styles.packageLabel}>Overlay tool</h4>
              <p className={Styles.packageFeatureDef} >News publishers can place texts and images over videos to make the story Youtube-ready</p>
            </div>


            <div className={Styles.packageContainer}>
              <BiSupport size={50} color='black' />
              <h4 className={Styles.packageLabel}>Support</h4>
              <p className={Styles.packageFeatureDef} >Connect with the support service for any assistance</p>
            </div>

          </div>
        </div>

        <div className={Styles.packageListContainer} style={{marginTop:'70px'}} >
          <h2 className={Styles.sectionTitle}>Top Publishers</h2>
          <p className={Styles.howItWorksContent}>Check out top NewzKit websites.</p>
          <div className={Styles.performersList}>
          {
            list
            ?
            list.map(item => {
              return (
                <div key={item.key} className={Styles.performersContainer} onClick={_ => handleVisitLink(item)} >
                  <img className={Styles.performersLogo} src={item.logo} />
                  <h3 className={Styles.performersName}>{item.fullName}</h3>
                </div>
              )
            })
            :
            null
          }
          </div>
          
        </div>

        <div className={Styles.teamsContainer} id="Team">
          <h2 className={Styles.sectionTitle}>Team</h2>
          <div className={Styles.teamListContainer}>
              <div className={Styles.teamMemberContainer} >
                <img className={Styles.teamPicture} alt="Tausif Alam" src="https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/The%20Team%2FTausif%20Alam.png?alt=media&token=fbce4923-a5c7-401d-be66-86591848dfb5" />
                <p className={Styles.teamName}>Tausif Alam</p>
                <p className={Styles.teamPosition}>Co-Founder</p>
              </div>

              

              <div className={Styles.teamMemberContainer} >
                <img className={Styles.teamPicture} alt="Krati Shrivastava" src="https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/The%20Team%2FKrati%20Shrivastava.png?alt=media&token=699753b0-5329-4e34-9ecf-551803169127" />
                <p className={Styles.teamName}>Krati Shrivastava</p>
                <p className={Styles.teamPosition}>Co-Founder</p>
              </div>

              <div className={Styles.teamMemberContainer} >
                <img className={Styles.teamPicture} alt="Rishabh Verma" src="https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/The%20Team%2FRishabh%20Verma.png?alt=media&token=17512155-6942-4067-b87a-679b6d46b2bf" />
                <p className={Styles.teamName}>Rishabh Verma</p>
                <p className={Styles.teamPosition}>Co-Founder</p>
              </div>

              <div className={Styles.teamMemberContainer} >
                <img className={Styles.teamPicture} alt="Aarish Alam" src="https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/The%20Team%2FIMG_20210729_153953%201%20(1).png?alt=media&token=7665f70b-e63e-4e98-b8f5-5812f8932f3c" />
                <p className={Styles.teamName}>Aarish Alam</p>
                <p className={Styles.teamPosition}>Investor</p>
              </div>
          </div>
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
        crossOrigin></Script>

      <Script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossOrigin></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></Script>

    </div>
  )
}



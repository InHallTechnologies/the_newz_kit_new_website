import Head from "next/head";
import CategoriesList from "../components/CategoriesList.component";
import Footer from "../components/Footer.component";
import HeroSpace from "../components/HeroSpace.component";
import Navigation from "../components/Navigation.component";
import NoPostUploaded from "../components/NoPostUploaded.component";
import styles from "../styles/Home.module.css";
import {useEffect} from "react";

export default function Home({ latest, allCategoryPosts, websiteDetails }) {

    useEffect(() => {
        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
    }, [])

    if (!latest.length) {
        return (<NoPostUploaded websiteDetails={websiteDetails} />)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{websiteDetails.fullName} {websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}</title>
                <meta property="og:url"                content={`https://${websiteDetails.name}.thenewzkit.com/`} />
                <meta property="og:type"               content="website" />
                <meta property="og:title"              content={`${websiteDetails.fullName} ${websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}`} />
                <meta property="og:description"        content={websiteDetails.description} />
                <meta property="og:image"              content={websiteDetails.logo} />
                <link id="favicon" rel="shortcut icon" type="image/png" href={websiteDetails.logo} />
            </Head>
            <header>
                <Navigation logo={websiteDetails.logo} />
            </header>
            <div className={styles.homeAdsContainer}>
                <ins className="adsbygoogle"
                     style={{display:'inline-block', margin:'20px auto',width:'350px', height:'90px', border:'1px solid black'}}
                     data-ad-client="ca-pub-2505151384138527"
                     data-ad-slot="1655269971"

                />
            </div>
            <HeroSpace latestData={latest} selectedCategories={websiteDetails.selectedCategories} />
            <CategoriesList list={allCategoryPosts} />
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0];
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www'){
        subdomain = "newsazamgarh";
    }
    const url = `https://www.thenewzkit.com/api/hello?subdomain=${subdomain}`;

    const dataResponse = await fetch(url);
    const data = await dataResponse.json();
    return {
        props: {
            latest: data.data,
            allCategoryPosts: data.allCategoryPosts,
            websiteDetails: data.websiteDetails
        },
    };
}

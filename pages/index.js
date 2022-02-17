import Head from "next/head";
import CategoriesList from "../components/CategoriesList.component";
import Footer from "../components/Footer.component";
import HeroSpace from "../components/HeroSpace.component";
import Navigation from "../components/Navigation.component";
import styles from "../styles/Home.module.css";

export default function Home({ latest, allCategoryPosts, websiteDetails }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{websiteDetails.fullName} {websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}</title>
            </Head>
            <header>
                <Navigation logo={websiteDetails.logo} />
            </header>

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
    const url = `https://www.themasalakhabar.com/api/hello?subdomain=${subdomain}`;
    
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

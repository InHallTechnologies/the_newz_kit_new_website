import Head from 'next/head';
import React, {useEffect} from 'react';
import CategoryListContainer from '../../components/CategoryListContianer.component';
import Navigation from '../../components/Navigation.component';
import PostArch from '../../components/PostArch.component';
import Styles from '../../styles/CategoryWisePosts.module.scss';

const CategoryWisePosts = ({ category, data, websiteDetails }) => {

    useEffect(() => {
        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
    }, [])
   

    return (
        <div className={Styles.categoryWisePostsContainer}>
            <Head>
                <title>{category} - {websiteDetails.fullName} {websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}</title>
                <meta property="og:url"                content={`https://${websiteDetails.name}.thenewzkit.com/${category}`} />
                <meta property="og:type"               content="website" />
                <meta property="og:title"              content={`${category} - ${websiteDetails.fullName} ${websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}`} />
                <meta property="og:description"        content={websiteDetails.description} />
                <meta property="og:image"              content={websiteDetails.logo} />
                <link id="favicon" rel="shortcut icon" type="image/png" href={websiteDetails.logo} />
            </Head>
            <Navigation logo={websiteDetails.logo} />
            <div className={Styles.content}>
                <CategoryListContainer selectedCategories={websiteDetails.selectedCategories} />

                <div className={Styles.mainContent}>
                    <h1>{category} News</h1>

                    <div className={Styles.contentList} >
                        {
                            data.map((item, index) => {
                                return (
                                    <>
                                        <PostArch key={item.postId} item={item} index={index} />
                                        {
                                            index % 9 === 0
                                            ?
                                                <div align={'center'}>
                                                    <ins className="adsbygoogle"
                                                         style={{display:"inline-block",width:"250px",height:"250px"}}
                                                         data-ad-client="ca-pub-2505151384138527"
                                                         align='center'
                                                         data-ad-slot="9168079861"></ins>
                                                </div>
                                                :
                                                null
                                        }
                                    </>


                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www'){
        subdomain = "newsazamgarh";
    }
	const url = `https://www.thenewzkit.com/api/category_wise_posts?category=${context.query.category}&subdomain=${subdomain}`;
	const dataResponse = await fetch(url);
	const data = await dataResponse.json();
	
    return {
        props: {
			category: context.query.category,
            data:data.data,
            websiteDetails: data.websiteDetails
		} 
    };
}


export default CategoryWisePosts;
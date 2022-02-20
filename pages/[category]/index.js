import Head from 'next/head';
import React, {useEffect} from 'react';
import CategoryListContainer from '../../components/CategoryListContianer.component';
import Navigation from '../../components/Navigation.component';
import PostArch from '../../components/PostArch.component';
import Styles from '../../styles/CategoryWisePosts.module.scss';

const CategoryWisePosts = ({ category, data, websiteDetails }) => {

    useEffect(() => {

    }, [])
   

    return (
        <div className={Styles.categoryWisePostsContainer}>
            <Head>
                <title>{category} - {websiteDetails.fullName} {websiteDetails.tagline? `- ${websiteDetails.tagline}` : ""}</title>
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
                                        <div align={'center'}>
                                            <ins className="adsbygoogle"
                                                 style="display:block; text-align:center;"
                                                 data-ad-layout="in-article"
                                                 data-ad-format="fluid"
                                                 data-ad-client="ca-pub-2505151384138527"
                                                 align="center"
                                                 data-ad-slot="3697455905"></ins>
                                        </div>
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
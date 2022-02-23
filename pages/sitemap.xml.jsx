import { firebaseDatabase } from "../backend/firebaseHandler.js";
import { ref, onValue } from 'firebase/database';

export default function Dummy(props) {
    return null;
}

export const getServerSideProps = async (context) => {
    const { res, query } = context;
    let subdomain = context.req.headers.host.split(".")[0];
    if (subdomain === "www") {
        subdomain = context.req.headers.host.split(".")[1];
    }
    const siteId =
        subdomain.includes("localhost") ||
        subdomain.includes("thenewzkit") ||
        subdomain.includes("www") ||
        subdomain.includes("the-newz-kit-website")
            ? "homepage"
            : subdomain;

    let sitemapString = "";

    if (siteId === "homepage") {
        sitemapString = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>http://thenewzkit.com</loc>
        </url>
        <url>
            <loc>http://thenewzkit.com/blog</loc>
        </url>

        <url>
            <loc>http://thenewzkit.com/contactUs</loc>
        </url>

        <url>
            <loc>http://thenewzkit.com/privacy-policy</loc>
        </url>

        <url>
            <loc>http://thenewzkit.com/blog/5-ways-to-earn-money-from-your-news-website</loc>
        </url>

        <url>
            <loc>http://thenewzkit.com/blog/5-business-models-of-digital-news-media</loc>
        </url>

        <url>
            <loc>http://thenewzkit.com/blog/6-Benefits-of-digital-news-media</loc>
        </url>

        <url>
            <loc>http://thenewzkit.com/aboutUs</loc>
        </url>
        </urlset>`;
    }else {
        const siteNameIdMapRef = ref(firebaseDatabase, `SITE_NAME_ID_MAP/${siteId}`)
        const mainIdPromise = new Promise((resolve, reject) => {
            onValue(siteNameIdMapRef, mainIdSnapshot => {
                const mainIdValue = mainIdSnapshot.val();
                resolve(mainIdValue);
            }, {onlyOnce:true});
        })
        // const mainIdSnapshot = await firebaseDatabase.ref("SITE_NAME_ID_MAP").child(siteId).get();
        const mainId = await mainIdPromise.then()
        
        const categoryWisePostRef = ref(firebaseDatabase, `CATEGORY_WISE_POSTS/${mainId}`);
        const categoryWisePostPromise = new Promise((resolve, reject) => {
            onValue(categoryWisePostRef, categoryWisePostSnapshot => {
                resolve(categoryWisePostSnapshot)
            })
        })
        const categoryWisePostSnapshot = await categoryWisePostPromise.then();
        
        const list = [];

        if (categoryWisePostSnapshot.exists()){
            for (const category in categoryWisePostSnapshot.val()) {
                for (const postId in categoryWisePostSnapshot.child(category).val()) {
                    const post = categoryWisePostSnapshot.child(category).child(postId).val();
                    const slug = post.slug?post.slug:postId;
                    list.push(`${category}/${slug}`);
                }
            }
        }

        sitemapString = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${list.map(item => `<url><loc>https://${siteId}.thenewzkit.com/${item}</loc></url>`)}
        </urlset>
        `


    }

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapString);
    res.end();

    return {
        props: {},
    };
};

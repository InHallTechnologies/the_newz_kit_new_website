import { ref, get, limitToLast, query, onValue, off } from "firebase/database";
import fetchFirebaseUID, { fetchPostId, fetchWebsiteDetails } from "../../backend/fetchFirebaseUID";
import { firebaseDatabase } from "../../backend/firebaseHandler";

export default async function handler(req, res) {

    const { subdomain, category, postId } = req.query;
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    const postSlugId = await fetchPostId(postId)
    const allPostsReference = ref(firebaseDatabase,`CATEGORY_WISE_POSTS/${firebaseUID}/${category}/${postSlugId}`);
    onValue(allPostsReference, async (allPostSnapshot) => {
        let post = {}
        if (allPostSnapshot.exists()) {
           post = await allPostSnapshot.val();
           post.content = post.content.split("font-size: 24px;").join("font-size: 1.2rem;")
            const contentArray = post.content.split(" ");
            const newContentArray = [];
            for(let i = 0; i<contentArray.length; i++) {
                newContentArray.push(contentArray[i]);
                if (i === Math.floor(contentArray.length / 2)) {
                    newContentArray.push(`<ins class="adsbygoogle" align='center' style="display:block; text-align:center; margin:13px 0" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-2505151384138527" data-ad-slot="3697455905"></ins>`);
                }
            }
            post.content = newContentArray.join(" ");
            
        }

      
        
        off(allPostsReference); 
        res.json({ websiteDetails, post, firebaseUID });
    });
    
}

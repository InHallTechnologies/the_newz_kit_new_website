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
        //    console.log("I NOT AM HERE")
        }
        // console.log("I AM HERE", firebaseUID, category, postSlugId, postId)
        off(allPostsReference); 
        res.json({ websiteDetails, post, firebaseUID });
    });
    
}

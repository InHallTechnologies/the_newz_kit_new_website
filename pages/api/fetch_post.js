import { ref, get, limitToLast, query } from "firebase/database";
import fetchFirebaseUID, { fetchPostId, fetchWebsiteDetails } from "../../backend/fetchFirebaseUID";
import { firebaseDatabase } from "../../backend/firebaseHandler";

export default async function handler(req, res) {

    const { subdomain, category, postId } = req.query;
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    const postSlugId = await fetchPostId(postId)
    const allPostsReference = ref(firebaseDatabase,`CATEGORY_WISE_POSTS/${firebaseUID}/${category}/${postSlugId}`);
    const allPostSnapshot = await get(allPostsReference);
    let post = {}
    if (allPostSnapshot.exists()) {
       post = await allPostSnapshot.val();
       post.content = post.content.split("font-size: 24px;").join("font-size: 1.2rem;")
    }


    res.json({ websiteDetails, post, firebaseUID });
}

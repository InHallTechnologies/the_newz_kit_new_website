import { ref, get, limitToLast, query } from "firebase/database";
import fetchFirebaseUID, { fetchWebsiteDetails } from "../../backend/fetchFirebaseUID";
import { firebaseDatabase } from "../../backend/firebaseHandler";

export default async function handler(req, res) {

    const { subdomain, category } = req.query;
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    const allPostsReference = ref(
        firebaseDatabase,
        `CATEGORY_WISE_POSTS/${firebaseUID}/${category}`
    );
    const allPostQueryRef = query(allPostsReference, limitToLast(20));
    const allPostSnapshot = await get(allPostQueryRef);
    const data = [];
    if (allPostSnapshot.exists()) {
        for (const key in allPostSnapshot.val()) {
            const post = allPostSnapshot.child(key).val();
            data.push(post);
        }
    }

    data.reverse();

    res.json({ data, websiteDetails });
}

import { firebaseDatabase } from "./firebaseHandler";
import { ref, get } from 'firebase/database';

const fetchFirebaseUID = async (subdomain) => {
    const firebaseUIDref = ref(firebaseDatabase, `SITE_NAME_ID_MAP/${subdomain.toLowerCase()}`);
    const firebaseUIDSnapshot = await get(firebaseUIDref);
    if (firebaseUIDSnapshot.exists()) {
        return firebaseUIDSnapshot.val();
    }else {
        return "NOT FOUND";
    }
}

export const fetchWebsiteDetails = async (firebaseUID) => {
    const websiteDetailsRef = ref(firebaseDatabase, `WEBSITE_DETAILS_ARCHIVE/${firebaseUID}`);
    const websiteDetailsSnapshot = await get(websiteDetailsRef);
    if (websiteDetailsSnapshot.exists()) {
        return websiteDetailsSnapshot.val();
    }else {
        return "NOT FOUND"
    }
}

export const fetchPostId = async (postSlug) => {
    const postSlugRef = ref(firebaseDatabase, `SLUG_MAP/${postSlug}`);
    const postSlugSnapshot = await get(postSlugRef);
    if (postSlugSnapshot.exists()){
        const postId = await postSlugSnapshot.val();
        return postId;
    }
}

export default fetchFirebaseUID;
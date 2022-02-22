import { firebaseDatabase } from "./firebaseHandler";
import { ref, get, query } from 'firebase/database';

const fetchFirebaseUID = async (subdomain) => {
    const firebaseUIDref = ref(firebaseDatabase, `SITE_NAME_ID_MAP/${subdomain.toLowerCase()}`);
    const firebaseUIDQuery = query(firebaseUIDref);
    const firebaseUIDSnapshot = await get(firebaseUIDQuery);
    if (firebaseUIDSnapshot.exists()) {
        return firebaseUIDSnapshot.val();
    }else {
        return "NOT FOUND";
    }
}

export const fetchWebsiteDetails = async (firebaseUID) => {
    const websiteDetailsRef = ref(firebaseDatabase, `WEBSITE_DETAILS_ARCHIVE/${firebaseUID}`);
    const websiteDetailsQuery = query(websiteDetailsRef);
    const websiteDetailsSnapshot = await get(websiteDetailsQuery);
    if (websiteDetailsSnapshot.exists()) {
        return websiteDetailsSnapshot.val();
    }else {
        return "NOT FOUND"
    }
}

export const fetchPostId = async (postSlug) => {
    const postSlugRef = ref(firebaseDatabase, `SLUG_MAP/${postSlug}`);
    const postSlugQuery = query(postSlugRef);
    const postSlugSnapshot = await get(postSlugQuery);
    if (postSlugSnapshot.exists()){
        const postId = await postSlugSnapshot.val();
        return postId;
    }
}


export const fetchUPI = async (firebaseUID) => {
    const upiRef = ref(firebaseDatabase, `UPI_ARCHIVE/${firebaseUID}`);
    const upiQuery = query(upiRef);
    const upiSnapshot = await get(upiQuery);
    if (upiSnapshot.exists()) {
        const upi = upiSnapshot.val();
        return upi;
    }else {
        return false;
    }
}

export default fetchFirebaseUID;
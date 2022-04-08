import { firebaseDatabase } from "./firebaseHandler";
import { ref, get, query } from 'firebase/database';

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
        const details = websiteDetailsSnapshot.val();
        let seoDescription = '`RSnews24 News is a news website which writes about local, national, international news'
        if (details.selectedCategories) {
            seoDescription = `RSnews24 News is a news website which writes about local ${details.selectedCategories.join(", ")} news`
        }
        
        return {...details, uid: firebaseUID, seoDescription:seoDescription};
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


export const fetchUPI = async (firebaseUID) => {
    const upiRef = ref(firebaseDatabase, `UPI_ARCHIVE/${firebaseUID}`);

    const upiSnapshot = await get(upiRef);
    if (upiSnapshot.exists()) {
        const upi = upiSnapshot.val();
        return upi;
    }else {
        return false;
    }
}

export default fetchFirebaseUID;
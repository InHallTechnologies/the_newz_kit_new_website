import { onValue, set, ref } from "firebase/database";
import { firebaseDatabase } from "./firebaseHandler";

const handlePostSourceRegister = async (userId, sourceType, post) => {
    let eventType = document.referrer;
    const date = new Date();
    eventType = eventType? eventType : "Organic";
    if (sourceType === postSourceTypes.WEBSITE) {
        const promise = new Promise(async (resolve, reject) => {
            const referenceRef = ref(firebaseDatabase, `REFERENCE_EVENTS/${userId}/${sourceType}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
            onValue(referenceRef, async (snapshot) => {
                if (snapshot.exists()) {
                    await set(referenceRef, {
                        ...snapshot.val(),
                        views: snapshot.val().views + 1
                    });
                }else {
                    await set(referenceRef, {
                        views: 1,
                        eventType: eventType,
                    });
                }
                resolve();
            }, { onlyOnce: true })
        })
        await promise.then();

    }else {
        const promise = new Promise(async (resolve, reject) => {
            const referenceRef = ref(firebaseDatabase, `REFERENCE_EVENTS/${userId}/${sourceType}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${post.postId}`);
            onValue(referenceRef, async (snapshot) => {
                if (snapshot.exists()) {
                    await set(referenceRef, {
                        ...snapshot.val(),
                        views: snapshot.val().views + 1
                    });
                }else {
                    await set(referenceRef, {
                        bannerPhoto: post.bannerPhoto,
                        category: post.category,
                        slug: post.slug?post.slug : post.postId,
                        postId: post.postId,
                        headline: post.headline,
                        views: 1,
                        eventType: eventType
                    });
                }
                resolve();
            }, { onlyOnce: true })
        })
        await promise.then();
    }

}

export const postSourceTypes = {
    "WEBSITE": "WEBISTE",
    "STORY": "STORY"
}

export default handlePostSourceRegister;
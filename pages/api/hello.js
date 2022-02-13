import { ref, get, limitToLast, query } from "firebase/database";
import list from "../../backend/catogoriesList";
import fetchFirebaseUID, { fetchWebsiteDetails } from "../../backend/fetchFirebaseUID";
import { firebaseDatabase } from "../../backend/firebaseHandler";

export default async function handler(req, res) {

    const { subdomain } = req.query;
    //Fetch firebase UID
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    const allPostsReference = ref(firebaseDatabase,`POST_ARCHIVE/${firebaseUID}`);
    const allPostQueryRef = query(allPostsReference, limitToLast(10));
    const allPostSnapshot = await get(allPostQueryRef);
    const data = [];
    let listItem = {};
    if (allPostSnapshot.exists()) {
        for (const key in allPostSnapshot.val()) {
            const post = allPostSnapshot.child(key).val();
            data.push(post);
        }
    }

	const task = [];
    for (let i = 0; i < Object.values(list).length; i++) {
		const promise = new Promise( async (resolve, reject) => {
			const category = Object.values(list)[i].english;
			const postList = await getCategoriesWiseList(category, firebaseUID);
			resolve(postList);
		})
		task.push(promise);
	}
	
	const allCategoryPosts = await Promise.all(task);


    data.reverse();

    res.json({ data, allCategoryPosts, websiteDetails });
}

const getCategoriesWiseList = async (category, firebaseUID) => {
	const allPostsReference = ref(
        firebaseDatabase,
        `CATEGORY_WISE_POSTS/${firebaseUID}/${category}`
    );
    const allPostQueryRef = query(allPostsReference, limitToLast(10));
    const allPostSnapshot = await get(allPostQueryRef);
	const data = [];
    if (allPostSnapshot.exists()) {
        for (const key in allPostSnapshot.val()) {
            const post = allPostSnapshot.child(key).val();
            data.push(post);
        }
    }
	data.reverse();
	return {name: `${category} News`, data};
};

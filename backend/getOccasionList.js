import { ref, get } from "firebase/database";
import { firebaseDatabase } from "./firebaseHandler";

export const GetOccasionList = async () => {
    const occasionListRef = ref(firebaseDatabase, `NEWZKIT_ADS_ARCHIVE/GLOBAL`);
    const occasionSnapshot = await get(occasionListRef);
    const data = [];
    if (occasionSnapshot.exists()) {
        for (const occasionKey in occasionSnapshot.val()) {
            const occasion = occasionSnapshot.child(occasionKey).val();
            data.push(occasion);
        }
    }

    return data;
}



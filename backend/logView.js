import { firebaseDatabase } from './firebaseHandler';
import { ref, runTransaction } from 'firebase/database';

const logView = async (slug, uuid) => {
    const viewRef = ref(firebaseDatabase, `VIEWS_LOGS/${slug}/${uuid}`);
    console.log(slug, uuid);
    runTransaction(viewRef, (currentData) => {
        if (currentData || currentData === 0) {
            return currentData + 1
        }else {
            return 0;
        }
    })
}

export default logView;
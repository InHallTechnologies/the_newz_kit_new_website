import { firebaseDatabase } from './firebaseHandler';
import { ref, onValue, set } from 'firebase/database';

const logView = async (slug, uuid, postId) => {
    const viewRef = ref(firebaseDatabase, `VIEWS_LOGS/${slug}/${uuid}`);

    onValue(viewRef, async (snapshot) => {
        if (snapshot.exists()) {
            const value = await snapshot.val();
            await set(viewRef, value + 1);
            await set(ref(firebaseDatabase, `VIEWS_LOGS/${postId}/${uuid}`), value + 1);
        }else {

            await set(viewRef, 1);
            await set(ref(firebaseDatabase, `VIEWS_LOGS/${postId}/${uuid}`), 1);
        }

    }, { onlyOnce:true });
}

export default logView;
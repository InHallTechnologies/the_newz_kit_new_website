import { firebaseDatabase } from './firebaseHandler';
import { ref, onValue, set } from 'firebase/database';

const logView = async (slug, uuid) => {
    const viewRef = ref(firebaseDatabase, `VIEWS_LOGS/${slug}/${uuid}`);

    onValue(viewRef, async (snapshot) => {
        if (snapshot.exists()) {
            const value = await snapshot.val();
            await set(viewRef, value + 1);
        }else {

            await set(viewRef, 0);
        }

    }, { onlyOnce:true });
}

export default logView;
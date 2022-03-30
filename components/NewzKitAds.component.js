import { Button, CircularProgress } from '@mui/material';
import { ref, onValue, limitToLast, query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { firebaseDatabase } from '../backend/firebaseHandler';
import Styles from '../styles/NewzKitsAds.module.scss';
import NewzKitAdsArch from './NewzkitAdsArch.component';
import router from 'next/router'


const NewzKitAds = () => {
    const [loading, setLoading] = useState(true);
    const [occasion, setOccasion] = useState([]);

    useEffect(() => {
        const globalClassifiedRef = ref(firebaseDatabase, `NEWZKIT_ADS_ARCHIVE/GLOBAL`);
        const firebaseQuery = query(globalClassifiedRef, limitToLast(5));
        onValue(firebaseQuery, (snapshot) => {
            if (snapshot.exists()){
                const data = [];
                for (const postKey in snapshot.val()) {
                    const post = snapshot.child(postKey).val();
                    data.push(post)
                }
                data.reverse()
               setOccasion(data)
               setLoading(false)
            }
        }, { onlyOnce:true } )
    }, [])

    const handleOccasionAction = (occasionId) => {
        router.push(`/classified?occasion_id=${occasionId}`)
    }
    
    return (
        <div className={Styles.container}>
            <div className={Styles.titleContainer}>
                <h2 className={Styles.sectionTitle}>Classified</h2>
                <Button href='/ads-with-us/fill-form'>Post ads here</Button>
            </div>
            {
                loading
                ?
                <div className={Styles.loadingContainer}>
                    <CircularProgress />
                </div>
                :
                <div className={Styles.archArchList}>
                    {
                        occasion.map(item => {
                            return (
                                <div className={Styles.archWrapper} key={item.adsUID}>
                                     <NewzKitAdsArch handlePress={handleOccasionAction} occasion={item} />
                                </div>
                            )
                        })
                    }
                </div>
            }
            
        </div>
    )
}

export default NewzKitAds;
import React, { useState } from 'react';
import Styles from '../styles/SelectedOccasion.module.scss';
import { Button } from '@mui/material'
import { onValue, ref, set } from 'firebase/database';
import { firebaseDatabase } from '../backend/firebaseHandler';

const SelectedOccasion = ({ occasion }) => {
    const { type, occasionFor, occasionMessage, mediaUrl, adsUID } = occasion;
    const [wishList, setWishList] = useState([
        'Congratulations', "Best Wishes", 
        "Hats off", "Nice going", 
        "You’re the best", "Pat on the back", 
        "Many happy returns"
    ])

    const handleWish = (wishes) => {
        const wishesRef = ref(firebaseDatabase, ` NEWZKIT_ADS_ARCHIVE/GLOBAL/${adsUID}/wishes/${wishes}`);
        // onValue(wishesRef, async (snapshot) => {
            
        //     if (snapshot.exists()) {
               
        //         await set(wishesRef, snapshot.val() + 1)
        //         alert(snapshot.val())
        //         alert("Done")
        //     }else {
               
        //         await set(wishesRef, 0)
        //         alert("Done")
        //     }
        // }, { onlyOnce:true })
    }

    return(
        <div className={Styles.container}>
            <div className={Styles.mediaContainer}>
                <img className={Styles.media} src={mediaUrl} />
            </div>
            
            <div className={Styles.occasionDetail}>
                <div>
                    <h1>{type}</h1>
                    <h3>{occasionFor}</h3>
                    <p>{occasionMessage}</p>
                </div>
                <div className={Styles.commentsContainer}>
                    <h3>What do you want to say??</h3>
                    <div className={Styles.commentsList}>
                    {
                        wishList.map(item => {
                            return (
                                <Button key={item} onClick={_ => handleWish(item)}  variant={'outlined'}>{item}</Button>
                            )
                            // return (
                            //     <div onClick={handleWish} className={Styles.wishContainer} key={item}>
                            //         <p className={Styles.wishLabel}>{item}</p>
                            //     </div>
                            // )
                        })
                    }
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default SelectedOccasion;
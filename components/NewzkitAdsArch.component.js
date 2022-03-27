import { Button } from "@mui/material";
import React from "react";
import Styles from '../styles/NewzKitAdsArch.module.scss';


const NewzKitAdsArch = ({occasion, handlePress}) => {
   

    return(
        <div className={Styles.Container}>
            <div className={Styles.mediaContainer}>
                <img className={Styles.media} src={occasion.mediaUrl} />
            </div>

            <div className={Styles.adsContentContainer}>
                <h1 className={Styles.type}>{occasion.type}</h1>
                <h3 className={Styles.occationFor}>{occasion.occasionFor}</h3>
                <p className={Styles.occasionMessage}>{occasion.occasionMessage}</p>
                <Button sx={{width:'100%', marginTop:'10px'}} onClick={() => handlePress(occasion.adsUID)} variant="contained">{occasion.occasionCTA}</Button>
            </div>
        </div>
    )
}

export default NewzKitAdsArch;
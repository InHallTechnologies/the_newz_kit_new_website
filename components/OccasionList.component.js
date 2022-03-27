import React from 'react';
import Styles from '../styles/OccasionList.module.scss';
import NewzKitAdsArch from './NewzkitAdsArch.component';

const OccasionList = ({ list, handleOccasionAction }) => {
    return (
        <div className={Styles.container}>
            {
                list.map(item => <NewzKitAdsArch key={item.adsUID} occasion={item} handlePress={_ => handleOccasionAction(item.adsUID)} /> )
            }
        </div>
    )
}

export default OccasionList;
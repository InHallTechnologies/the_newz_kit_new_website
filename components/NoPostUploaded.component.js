import React from 'react';
import Styles from '../styles/NoPostUploaded.module.scss';

const NoPostUploaded = ({ websiteDetails }) => {

    return (
        <div className={Styles.NoPostUploadedContainer}>
            <img className={Styles.illustation} src='/under-construction.png' />
            <h2 className={Styles.label}><strong style={{color:'black', marginTop:'10px'}} >Website Under Construction</strong></h2>
            <h3 style={{marginTop:'5px', fontWeight:'500'}} >{websiteDetails.fullName.toUpperCase()} has not updated any posts</h3>
        </div>
    )
}

export default NoPostUploaded;
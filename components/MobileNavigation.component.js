import { Button, Divider, SwipeableDrawer } from '@mui/material';
import React, { useState }  from 'react';
import Styles from '../styles/MobileNavigation.module.css';
import { BiMenu } from 'react-icons/bi';


const MobileNavigation = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

    return (
        <div className={Styles.navigationIconContainer}>
          <div className={Styles.downloadContainer} >
            <div >
              <a href='https://play.google.com/store/apps/details?id=com.obuv.newzy&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img style={{height:"40px", marginRight:'10px', marginTop:'5px'}} alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
            </div>
            <BiMenu size={30} color='#000' onClick={toggleDrawer('right', true)}/>
          </div>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            <div className={Styles.mobileNavigationContainer}>
                <img className={Styles.logo} src='/newzy_logo.png' />
                <div className={Styles.actionContainer}>
                    <div className={Styles.bottomActionContainer}>
                        <p>Login</p>
                        <p style={{margin:'0px 10px'}}>•</p>
                        <p>Sign Up</p>
                    </div>

                    <div className={Styles.navigationItems}>
                        <Button>Conctact Us</Button>
                        <Divider />
                        <Button>About Us</Button>
                        <Divider />
                        <Button>Privacy Policy</Button>
                    </div>
                </div>
            </div>
          </SwipeableDrawer>
        </div>
    )
}

export default MobileNavigation;
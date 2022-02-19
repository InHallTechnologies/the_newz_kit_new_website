import { Button, Divider, SwipeableDrawer } from '@mui/material';
import React, { useState }  from 'react';
import Styles from '../styles/MobileNavigation.module.css';
import { BiMenu } from 'react-icons/bi';


const MobileNavigation = ({ logo }) => {
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
                <img className={Styles.logo} src={logo} />
                <div className={Styles.actionContainer}>
                    <div className={Styles.bottomActionContainer}>
                        <p>Login</p>
                        <p style={{margin:'0px 10px'}}>•</p>
                        <p>Sign Up</p>
                    </div>

                    <div className={Styles.navigationItems}>
                        <Button href='/contact-us' >Contact Us</Button>
                        <Divider />
                        <Button href='/privacy-policy'>Privacy Policy</Button>
                        <Divider />
                        <Button href='/support-us'>Support Us</Button>
                    </div>
                </div>
            </div>
          </SwipeableDrawer>
        </div>
    )
}

export default MobileNavigation;
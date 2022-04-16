import { Button, Divider, SwipeableDrawer } from '@mui/material';
import React from 'react';
import Styles from '../styles/MobileNavigation.module.css';
import { BiMenu } from 'react-icons/bi';
import { FaWhatsappSquare } from 'react-icons/fa';
import Router from 'next/router';


const MobileNavigation = ({ logo, whatsappGroupUrl }) => {
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

      const handleWhatsappGroup = () => {
        Router.push(whatsappGroupUrl)
      }

    return (
        <div className={Styles.navigationIconContainer}>
          <div className={Styles.downloadContainer} >
            <div>
              {
                whatsappGroupUrl
                ?
                <Button onClick={handleWhatsappGroup} sx={{fontSize:"0.7rem", backgroundColor:'#25D366', marginRight:1}} variant='contained'  >
                  <FaWhatsappSquare color='#fff' size={20} style={{marginRight:5}} />
                  Join Whatsapp Group
                </Button>
                :
                null
              }
                
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
import React from "react";
import { Button, Divider } from "@mui/material";
import { FaWhatsappSquare } from 'react-icons/fa';
import Styles from '../styles/FloatingWhatsappButton.module.css';
import Router from "next/router";

const FloatingWhatsappButton = ({whatsappGroupUrl}) => {
    const handleWhatsappGroup = () => {
        Router.push(whatsappGroupUrl)
    }


    if (whatsappGroupUrl) {
        return(
            <Button onClick={handleWhatsappGroup} sx={{fontSize:"0.7rem", backgroundColor:'#25D366', marginRight:1, position:'fixed', right:0, bottom:20}} variant='contained'  >
              <FaWhatsappSquare color='#fff' size={20} style={{marginRight:5}} />
              Get News on Whatsapp
            </Button>
        )
    }else {
        return null
    }

    
}

export default FloatingWhatsappButton;
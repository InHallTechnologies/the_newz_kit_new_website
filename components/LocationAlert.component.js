import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Context from "../context/appContext";
import { TextField } from "@mui/material";
import Styles from '../styles/LocationAlert.module.css';
import { ref, get } from 'firebase/database';
import { firebaseDatabase } from "../backend/firebaseHandler";

export default function LocationAlert({ noMargin }) {
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = React.useContext(Context);
    const [districtList, setDistrictList] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");


    React.useEffect(() => {
        getDistrictList(searchQuery);
    }, [searchQuery])


    const getDistrictList = async () => {
        if (searchQuery.length >= 3) {
            const districtRef = ref(firebaseDatabase, `DISTRICTS_LIST`);
            const districtListSnapshot = await get(districtRef);
            let data = [];
            if (districtListSnapshot.exists()) {
                for (const state in districtListSnapshot.val()) {
                   for (const index in districtListSnapshot.child(state).val()) {
                       const district = districtListSnapshot.child(state).child(index).val();
                       if (district.toLowerCase().includes(searchQuery.toLowerCase()))
                       data.push(district);
                   }
                }
                data = [...new Set(data)]
                setDistrictList(data);
            }
        }
        
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = (item) => {
        setLocation(item);
        window.open(`https://${item}.newzy.live`);
        handleClose();
    }

    return (
        <>
            <Button sx={{ marginRight: noMargin? "0":"20px" }} onClick={handleClickOpen} >Change Location</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please provide your location (District)"}
                </DialogTitle>
                <DialogContent>
                    <div className={Styles.locationAlertContent}>
                        <div style={{backgroundColor:'#fff', zIndex:1, position:'sticky', top:0 }} >
                            <TextField value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className={Styles.locationAlertSearchBar} id="outlined-basic" label="Search District" variant='standard' />
                        </div>
                        
                        <div className={Styles.locationList}>
                            {
                                districtList.map(item => {
                                    return <Button onClick={_ => handleSelect(item)} key={item}>{item}</Button>
                                })
                            }
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { firebaseDatabase } from '../backend/firebaseHandler';
import { CgProfile } from 'react-icons/cg';
import Styles from '../styles/AlertsComment.module.css'
import { SiGooglemessages } from 'react-icons/si';


export default function CommentsLogs({postId, commentCountButton}) {
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  

  React.useEffect(() => {
    const commentsRef = ref(firebaseDatabase, `COMMENTS_LOGS/${postId}`);
    onValue(commentsRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = []
            for (const sessionId in snapshot.val()) {
                for (const commentsId in snapshot.child(sessionId).val()){
                  const comments = snapshot.child(sessionId).child(commentsId).val();
                  data.push({...comments, key: commentsId});
                } 
            }
           
            setComments(data)
        }
    }, { onlyOnce:false })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        

        {
          commentCountButton
          ?
          <div className={Styles.upVoteContainer} onClick={handleClickOpen} style={{height:'100%'}}  >
            <SiGooglemessages   size={17}  />
            <span className={Styles.upVoteCount}>{comments.length}</span>
          </div>
          :
          <div style={{marginTop:"5px"}}>
            <Link sx={{ fontSize:"0.9rem", marginLeft:'5px', cursor:'pointer' }} variant="outlined" onClick={handleClickOpen}>
              View all comments
            </Link>
          </div>
        }
        
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Comments"}
        </DialogTitle>
        <DialogContent >
            {
                comments.map(item => {
                    return(
                        <div key={item.commentsId}>
                           <div style={{display:'flex', alignItems:'flex-start', maxWidth:'350px', padding:'5px 5px'}} >
                                <CgProfile  size={20} color="#444" style={{marginTop:'5px'}}/>
                                <p className={Styles.commentsListText} style={{marginLeft:'10px', wordBreak:'break-all'}}>{item.value}</p>
                               
                           </div>
                           <div style={{textAlign:'right'}}>
                                <span style={{fontSize:'0.8rem', color:'#666'}} >{item.date}</span>
                                <span style={{fontSize:'0.8rem', color:'#666', marginLeft:'10px'}} >{item.time}</span>
                            </div>
                           <Divider />
                        </div>
                    )
                })
            }
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

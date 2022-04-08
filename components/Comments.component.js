import React, { useEffect, useRef, useState } from 'react';
import Styles from '../styles/Comments.module.scss';
import { IoMdArrowDropup } from 'react-icons/io';
import { BsFacebook, BsWhatsapp, BsTwitter } from 'react-icons/bs'
import {  onValue, push, ref, set } from 'firebase/database';
import { firebaseDatabase } from '../backend/firebaseHandler';
import { uuid } from 'uuidv4';
import { dateString, timeString } from '../backend/getDateAndTime';
import CommentsLogs from './CommetsLogs.component';
import axios from 'axios';
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton,  } from 'react-share'

const Comments  = ({ postId, post, subdomain, firebaseUID }) => {
    const [upvotes, setUpvotes] = useState(null);
    const [comment, setComment] = useState('');
    const seessionId = useRef();
    const [currentUrl, setCurrentUrl] = useState();


    useEffect(() => {
        setCurrentUrl(`https://${subdomain}.thenewzkit.com/${post.category}/${postId}`)

        seessionId.current = uuid();
        const upvoteRef = ref(firebaseDatabase, `UPVOTES_LOGS/${postId}`);
        onValue(upvoteRef, snapshot => {
            
            if (snapshot.exists()) {
                setUpvotes(snapshot.size);
            }else {
                setUpvotes(0);
            }
        }, {onlyOnce:true})
        
    }, [])

    const incrementUpvote = () => {
        
        const upvoteRef = ref(firebaseDatabase, `UPVOTES_LOGS/${postId}/${seessionId.current}`);
        set(upvoteRef, dateString).then(result => {
            setUpvotes(data => data + 1);
        })
    }

    const handleCommentSubmit = (e) => {
        if (e.key === 'Enter') {
            const commentId = push(ref(firebaseDatabase, `COMMENTS_LOGS/${postId}/${seessionId.current}`)).key;
            const upvoteRef = ref(firebaseDatabase, `COMMENTS_LOGS/${postId}/${seessionId.current}/${commentId}`);
            set(upvoteRef, {
                date: dateString,
                time: timeString,
                value: comment
            }).then(result => {
                sendCommentNotification("Hello")
                setComment("");
                sendCommentNotification()
            })
        }
    }

    const sendCommentNotification = async (comment) => {
        const encoded = encodeURIComponent(post.bannerPhoto);
        const response = await axios(`http://theinhall.localhost:3000/api/sendNotifications?category=${post.category}&postId=${post.postId}&siteUID=${firebaseUID}&type=Comment&newViews=200&image=${encoded}&comment=${comment}`)
        const data = await response.data;
        console.log(data)
    }


    return(
        <div className={Styles.commentsContainer}>
            <div className={Styles.commentsActions}>
                <div className={Styles.upVoteContainer} onClick={incrementUpvote}>
                    <IoMdArrowDropup size={20}  />
                    <span className={Styles.upVoteCount}>{upvotes}</span>
                </div>

                <div className={Styles.shareContainer}>
                    Share:
                    <div className={Styles.socialShareContainer}>
                        <WhatsappShareButton title={post.headline+"\n\n"} url={currentUrl} >
                            <BsWhatsapp size={16}  />
                        </WhatsappShareButton>
                    </div>

                    <div className={Styles.socialShareContainer}>
                        <FacebookShareButton  quote={post.headline+"\n\n"} url={currentUrl}  >
                            <BsFacebook size={16}  />
                        </FacebookShareButton>
                    </div>
                    
                    <div className={Styles.socialShareContainer}>
                        <TwitterShareButton title={post.headline+"\n\n"} url={currentUrl}  >
                            <BsTwitter size={16}  />
                        </TwitterShareButton>
                    </div>
                   
                </div>
            </div>
            <input className={Styles.commentInput} placeholder='Write your comment here' value={comment} onChange={event => setComment(event.target.value)} onKeyDown={handleCommentSubmit} />
            {/* <span className={Styles.viewComments}>View all comments</span> */}
            <CommentsLogs postId={postId} />
        </div>
    )
}

export default Comments
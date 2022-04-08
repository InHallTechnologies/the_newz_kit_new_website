import axios from "axios";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import { onValue, ref } from "firebase/database";

export default async function handler(req, res) {
    const {postId, newViews, siteUID, category, type, image, comment} = req.query;
    
    const websiteDetails = await fetchValue(`WEBSITE_DETAILS_ARCHIVE/${siteUID}`);
    const post = await fetchValue(`CATEGORY_WISE_POSTS/${siteUID}/${category}/${postId}`);

    if (type === "Comment"){
        const notificationBody = `A reader commented on ${post.headline.substring(0, 50)}: ${comment}`
        console.log(notificationBody)
        const response =  await sendNotification(websiteDetails.notificationId, notificationBody,"This is title", image);
        res.send({response: response});
    }
    


   
}


const sendNotification = async (uid, body, title, image, ) => {
    if (!uid){
        console.log("Cannot send to this one")
        return;
    }
    var dataString = {
        to: uid,
        title: "बधाई हो!",
        body: body,
        imageUrl: "https://picsum.photos/200/300"
    };

    try {
        const response = await axios({
            method:"POST",
            url:'https://exp.host/--/api/v2/push/send',
            data:dataString,
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data
    }catch(err) {
        console.log(err)
        return err
    }
    
    
};

const fetchValue = async (path) => {
    const promise = new Promise((resolve, reject) => {
        const databaseRef = ref(firebaseDatabase, path);
        onValue(databaseRef, snapshot => {
            if (snapshot.exists()) {
                resolve(snapshot.val())
            }
        }, { onlyOnce:true })
    })
    const data = await promise.then();
    return data;
}
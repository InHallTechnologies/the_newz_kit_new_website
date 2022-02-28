const handlePostSourceRegister = async (url, sourceType) => {
    const eventType = document.referrer;
    const refereereRef = ref(firebaseDatabase, `REFERENCE_EVENTS/${userId}/${url}/${sourceType}`);
    await set(refereereRef, eventType);
}
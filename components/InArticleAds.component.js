import React, { useEffect } from 'react'

const InArticleAds = () => {

    useEffect(() => {
        var ads = document.getElementsByClassName("adsbygoogle").length;
        for (var i = 0; i < ads; i++) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {

            }
        }
    })

    return (
        <ins className="adsbygoogle"
            style={{display:'block'}}
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-2505151384138527"
            data-ad-slot="9313510941"></ins>
    )
}

export default InArticleAds;
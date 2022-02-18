import Head from 'next/head';
import React from 'react';
import fetchFirebaseUID, { fetchWebsiteDetails } from '../../backend/fetchFirebaseUID';
import Styles from '../../styles/PrivacyPolicy.module.scss';


const PrivacyPolicy = ({ siteId, siteData }) => {

    return (
        <div style={{ margin: "20px 20px" }}>
            <Head>
                <title>Privacy Policy | NewzKit </title>
            </Head>
            <div className="privacy-container">
                <p>
                    Your privacy is of utmost importance to us here at{" "}
                    {`${siteId}`}. Rest assured that any information you provide
                    will only be used in accordance with this privacy statement.
                    We only share your information with trusted companies and
                    our advertisers.
                </p>

                <p>
                    This policy may be updated or changed anytime and we
                    encourage you to review it whenever you visit the site to
                    make sure you understand how any personal information you
                    provide will be used. This policy was initially drafted on
                    2nd September 2021.
                </p>

                <p>
                    <strong>Twitter</strong>
                </p>

                <p>
                    <strong>
                        Retweets don&rsquo;t mean&nbsp;endorsements:&nbsp;
                    </strong>
                    Retweet doesn&rsquo;t mean any endorsement. {`${siteId}`}{" "}
                    official Twitter account can retweet on the following terms
                </p>

                <ul>
                    <li>Interesting tweet for viewers</li>
                    <li>
                        Some interesting facts relating to our city, state,
                        country&nbsp;
                    </li>
                    <li>
                        Some interesting facts relating to politicians and
                        political parties&nbsp;
                    </li>
                    <li>Endorsement by anyone</li>
                    <li>
                        Any tweet by Twitter account is strictly not a&nbsp;type
                        of endorsement. We also may not agree with the comment
                        written.
                    </li>
                </ul>

                <p>
                    <strong>Collection and Use of Information</strong>
                </p>

                <p>
                    We may collect personally identifiable information such as
                    names and email addresses only when voluntarily submitted.
                    This information is used merely to fulfill a specific
                    request, for example, to post a comment on our blog, to
                    create an account in our Forum, or to subscribe to our
                    mailing list. All emails and newsletters from this site
                    allow you to opt out of further communications.
                </p>

                <p>
                    <strong>Distribution of Information</strong>
                </p>

                <p>
                    We never use or share any of that information in ways
                    unrelated to the ones described above. We do not send spam
                    and we do not sell your information to any company for
                    marketing purposes. We may, however, share information with
                    governmental agencies or other companies assisting us in
                    fraud prevention or investigation. We may do so when: (1)
                    permitted or required by law; (2) trying to protect against
                    or prevent actual or potential fraud or unauthorized
                    transactions; or (3) investigating fraud that has already
                    taken place.
                </p>

                <p>
                    <strong>Cookies and Tracking Technology</strong>
                </p>

                <p>
                    Our site may place a small file, called a cookie, on your
                    hard drive to provide you with a better website. A cookie
                    does not, in any way, give us access to your computer or to
                    any personally identifiable information about you, other
                    than the data you choose to share with us. It only helps us
                    analyze web traffic or lets web applications respond to you
                    as an individual.
                </p>

                <p>
                    Our authorized third-party advertisers in the course of
                    serving ads to you, may also place cookies on your browser
                    or use tracking technology to collect information. You can
                    choose not to accept cookies by modifying your browser
                    settings. At any time, you may remove any cookies stored on
                    your hard drive by deleting them in your browser&rsquo;s
                    settings section.
                </p>

                <p>
                    Google, one of our third-party advertisers, may add a cookie
                    to determine targeted advertisements based on your
                    preferences and your visit to our site and other sites on
                    the internet. You can choose to opt-out of Google&rsquo;s
                    use of cookies by visiting the Google ad and content network
                    privacy policy.
                </p>

                <p>
                    We believe in open communication if you have any queries
                    regarding {siteId === "NewzKit"
                            ? "NewzKit"
                            : siteData.customDomain? `${siteData.customDomain}`:`${siteId.toLowerCase()}.thenewzkit.com`}.
                </p>

                <p>Please email us at tausif@thenewzkit.com</p>

                <p>
                    <strong>Links to other Websites</strong>
                </p>

                <p>
                    Our site may contain links to other websites of interest.
                    However, once you use these links to leave our site, we do
                    not anymore have control over that website. Such sites are
                    not governed by this privacy statement and we cannot be
                    responsible for the protection and privacy of any
                    information you provide to those sites. Exercise caution and
                    read the privacy statement applicable to the website in
                    question.
                </p>

                <p>
                    <strong>Who we are</strong>
                </p>

                <p>
                    Our website address is{" "}
                    {`${
                        siteId === "NewzKit"
                            ? "https://thenewzkit.com/privacy-policy"
                            : siteData.customDomain? `https://${siteData.customDomain}/privacy-policy`:`https://${siteId.toLowerCase()}.thenewzkit.com/privacy-policy`
                    }`}{" "}
                    owned by Obuv Network private limited&nbsp;
                </p>

                <p>
                    <strong>
                        What personal data we collect and why we collect it
                    </strong>
                </p>
                <p>
                    <strong>Comments</strong>
                </p>

                <p>
                    When visitors leave comments on the site, we collect the
                    data shown in the comments form, and also the
                    visitor&rsquo;s IP address and browser user agent string to
                    help spam detection.
                </p>

                <p>
                    An anonymized string created from your email address (also
                    called a hash) may be provided to the Obuv Network to see if
                    you are using it. The Obuv Network privacy policy is
                    available here:&nbsp;
                </p>

                <p>
                    {`${
                        siteId === "NewzKit"
                            ? "https://thenewzkit.com/privacy-policy"
                            : siteData.customDomain? `https://${siteData.customDomain}/privacy-policy`:`https://${siteId.toLowerCase()}.thenewzkit.com/privacy-policy`
                    }`}
                    . After approval of your comment, your profile picture is
                    visible to the public in the context of your comment.
                </p>

                <p>
                    <strong>Media</strong>
                </p>

                <p>
                    If you upload images to the website, you should avoid
                    uploading images with embedded location data (EXIF GPS)
                    included. Visitors to the website can download and extract
                    any location data from images on the website.
                </p>

                <p>
                    <strong>Contact forms</strong>
                </p>

                <p>
                    If you fill contact form on our website to reach out, your
                    data such as email, IP and Phone Number will remain with us
                    for next 3 months.
                </p>

                <p>
                    <strong>Cookies</strong>
                </p>

                <p>
                    If you leave a comment on our site you may opt-in to save
                    your name, email address and website in cookies. These are
                    for your convenience so that you do not have to fill in your
                    details again when you leave another comment. These cookies
                    will last for one year.
                </p>

                <p>
                    If you have an account and you log in to this site, we will
                    set a temporary cookie to determine if your browser accepts
                    cookies. This cookie contains no personal data and is
                    discarded when you close your browser.
                </p>

                <p>
                    When you log in, we will also set up several cookies to save
                    your login information and your screen display choices.
                    Login cookies last for two days, and screen options cookies
                    last for a year. If you select &ldquo;Remember Me&rdquo;,
                    your login will persist for two weeks. If you log out of
                    your account, the login cookies will be removed.
                </p>

                <p>
                    If you edit or publish an article, an additional cookie will
                    be saved in your browser. This cookie includes no personal
                    data and simply indicates the post ID of the article you
                    just edited. It expires after 1 day.
                </p>

                <p>
                    <strong>Embedded content from other websites</strong>
                </p>

                <p>
                    Articles on this site may include embedded content (e.g.
                    videos, images, articles, etc.). Embedded content from other
                    websites behaves in the exact same way as if the visitor has
                    visited the other website.
                </p>

                <p>
                    These websites may collect data about you, use cookies,
                    embed additional third-party tracking, and monitor your
                    interaction with that embedded content, including tracing
                    your interaction with the embedded content if you have an
                    account and are logged in to that website.
                </p>

                <p>
                    <strong>Analytics</strong>
                </p>

                <p>
                    <strong>Who we share your data with</strong>
                </p>
                <ul>
                    <li>Google Analytics</li>
                    <li>Google AdSense</li>
                    <li>Google Services</li>
                    <li>Twitter</li>
                    <li>Facebook</li>
                </ul>

                <p>
                    <strong>How long we retain your data</strong>
                </p>

                <p>
                    If you leave a comment, the comment and its metadata are
                    retained indefinitely. This is so we can recognize and
                    approve any follow-up comments automatically instead of
                    holding them in a moderation queue.
                </p>
                <p>
                    For users that register on our website (if any), we also
                    store the personal information they provide in their user
                    profile. All users can see, edit, or delete their personal
                    information at any time (except they cannot change their
                    username). Website administrators can also see and edit that
                    information.
                </p>

                <p>
                    <strong>What rights you have over your data</strong>
                </p>

                <p>
                    If you have an account on this site or have left comments,
                    you can request to receive an exported file of the personal
                    data we hold about you, including any data you have provided
                    to us. You can also request that we erase any personal data
                    we hold about you. This does not include any data we are
                    obliged to keep for administrative, legal, or security
                    purposes.
                </p>
                <p>
                    We will respond to any queries or request for removal of
                    private data within 100 hours.
                </p>

                <p>
                    <strong>Where we send your data</strong>
                </p>

                <p>
                    Visitor comments may be checked through an automated spam
                    detection service.
                </p>

                <p>
                    <strong>Additional information</strong>
                </p>

                <p>
                    <strong>How we protect your data</strong>
                </p>

                <p>
                    We respect your privacy and protect the data by providing
                    only meaningful data to partners.
                </p>

                <p>
                    <strong>
                        What automated decision making and/or profiling we do
                        with user data
                    </strong>
                </p>

                <p>
                    We flush the IP Address and other critical information saved
                    in our database every 2 months.
                </p>
            </div>
        </div>
    );
}


export async function getServerSideProps(context) {
    let subdomain = context.req.headers.host.split('.')[0]; 
    if (subdomain === 'localhost:3000' || subdomain === 'themasalakhabar' || subdomain === 'www'){
        subdomain = "newsazamgarh";
    }
    const firebaseUID = await fetchFirebaseUID(subdomain);
    const websiteDetails = await fetchWebsiteDetails(firebaseUID);
    return {
      props: {
        siteId: websiteDetails.fullName,  
        firebaseUID, 
        siteData:websiteDetails
      }, // will be passed to the page component as props
    }
}

export default PrivacyPolicy;
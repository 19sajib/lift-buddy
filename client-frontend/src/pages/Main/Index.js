import React from 'react'
import about from '../../assests/images/aa.jpg'
import help from '../../assests/images/help.png'
import verify from '../../assests/images/verify.png'
import confirm from '../../assests/images/confirm.png'
import chat from '../../assests/images/chat.png'
import im from '../../assests/images/ride.jpg'

import './index.css'

const Index = () => {
    return (
        <div className="App">

         <section id="hero_area">
            <div className="inner_hero container">
                <img src={im} alt="HERO" className="alinegleft"/>
                <h2>Lift-Buddy</h2>
                <p>Your Long Distance Ride Hacker</p>
                <p>If you have extra space in your car, please share it with other people. By posting your travel route, available seats, and rent per head. That’s it.</p>
                <button><a href="/posts">Check Now</a></button>
                {/* <a href="#">read more  	&gt;</a> */}
            </div>
    </section>

         <section id="work_area">
            
            <div className="inner_work container">
                <div className="about_area child_work">
                   <h2>A Little About Us</h2>
                    <img src={about} alt=""/>
                    <p>Here in Lift-Buddy we are welcoming two types of person one who can host a ride(own car or bike) another who will be the guest.</p>
                    <p>Here the host decides where will go and when will go and how many people will go with him/her. And guest can pick any of the hosts from his/her preference.</p>
                    {/* <a href="/about-us">Read More About Us »</a> */}
                </div>
                <div className="service_area child_work">
                   
                    <h2>Some of Our Strength</h2>
                    
                    <div className="child_service">
                        <div className="service_img">
                            <img src={help} height="64px" width="64px" alt=""/>
                        </div>
                        <div className="service_text">
                            <h3>Help if you need it</h3>
                            <p>Get 24/7 support in the contact us form for any questions or safety concerns you might have. </p>
                        </div>
                    </div>
                    <div className="child_service">
                        <div className="service_img">
                            <img src={verify} height="64px" width="64px" alt=""/>
                        </div>
                        <div className="service_text">
                            <h3>Verified User</h3>
                            <p>Only verified user can be host or guest. User must verify their account with goverment issued photo ID card.</p>
                        </div>
                    </div>
                    <div className="child_service">
                        <div className="service_img">
                          <img src={confirm} height="64px" width="64px" alt=""/>
                        </div>
                        <div className="service_text">
                            <h3>Confimation Email</h3>
                            <p>You will get a ride confirmation and cancelation email. </p>
                        </div>
                    </div>
                    <div className="child_service">
                        <div className="service_img">
                            <img src={chat} height="64px" width="64px" alt=""/>
                        </div>
                        <div className="service_text">
                            <h3>Chat Group</h3>
                            <p>Host and guest will be in a chat group so that they can discuss picking points and so on.</p>
                        </div>
                    </div>
                    {/* <a href="/">View All Of Our Services »</a> */}
                    
                </div>
                <div className="testimonial_work child_work">
                    <h2>How our system works!</h2>
                    <div className="child_testimonial">
                        <h3>You open account and then <span> verify your profile.</span></h3>
                        <p>You host a ride by creating a post with your destination, leaving time, the number of hosts, and also you can leave notes by asking any particular type of Lift-Buddy.</p>
                        {/* <a href="/">View This Project »</a> */}
                    </div>
                    <div className="child_testimonial">
                        <h3>Guest will confirm a <span> ride</span></h3>
                        <p>After the ride confirmation. All the Guests and the host will be added to a chat group automatically, where they can discuss other matters(like picking points). And a successful ride has been arranged. Have a nice journey!</p>
                        {/* <a href="/">View This Project »</a> */}
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Index

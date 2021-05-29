import React from 'react'
import './index.css'

const Index = () => {
    return (
        <div className="App">
            <div class="inner_footer container">

<div class="child_footer">
<h3>LIFT-BUDDY</h3>
<p> Your ride hacker</p>
<p>We are here for you 24/7.</p>

</div>

<div class="child_footer">
  <h3>IMPORTANT LINKS</h3>
  <ul>
    <li><a href="/">Home Page</a></li>
    <li><a href="/posts">All Posts</a></li>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/chat-dashboard">Inbox</a></li>
    <li><a href="/auth">Sign In / Up</a></li>
  </ul>
</div>
<div class="child_footer">
  <h3>QUICK LINKS</h3>
  <ul>
    <li><a href="/contact-us">Contact Us</a></li>
    <li><a href="/about-us">About Us</a></li>
    <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
    <li><a href="/">Privacy Policy</a></li>
  </ul>
</div>
</div>

<section id="copyright_area">
          <div class="inner_copyright container">
              <div class="left_copyright">
                   <p>Copyright © 2021 Lift-Buddy - All Rights Reserved</p>
              </div>
              <div class="right_copyright">
                   <p>MERN Project by Sajib</p>
              </div>
          </div>
  </section>

        </div>
    )
}

export default Index

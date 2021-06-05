import React from 'react'
import './index.css'

const Index = () => {
    return (
        <div className="App">
            <div className="inner_footer container">

<div className="child_footer">
<h3>LIFT-BUDDY</h3>
<p> Your long distance ride hacker</p>
<p>We are here for you 24/7.</p>

</div>

<div className="child_footer">
  <h3>QUICK LINKS</h3>
  <ul>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/shoutbox">Shoutbox</a></li>
    <li><a href="/posts">Post Feed</a></li>
    <li><a href="/">Home Page</a></li>
    <li><a href="/auth">Sign In / Up</a></li>
  </ul>
</div>
<div className="child_footer">
  <h3>IMPORTANT LINKS</h3>
  <ul>
    <li><a href="/about-me">About Me</a></li>
    <li><a href="/contact-us">Contact Us</a></li>
    <li><a href="/privacy-policy">Privacy Policy</a></li>
    <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
    <li><a href="/feedback-report-issue">Report a Issue or Leave Feedback</a></li>
  </ul>
</div>
</div>

<section id="copyright_area">
          <div className="inner_copyright container">
              <div className="left_copyright">
                   <p>Copyright © 2021 Sajib Ltd - All Rights Reserved</p>
              </div>
              <div className="right_copyright">
                   <p>Lift-Buddy MERN Project by Sajib</p>
              </div>
          </div>
  </section>

        </div>
    )
}

export default Index

import React from 'react'
import '../css/AboutUsComponent.css'
import aboutUsLogo from '../images/about-us-logo.png'
import aboutUsHeadingImage from '../images/about-us-heading.png'
import ourMissionLogo from '../images/our-mission-logo.png'
import commitmentLogo from '../images/commitment-logo.png'
import whatSetsUsApart from '../images/what-sets-us-apart-logo.png'

const AboutUsComponent = () => {
  return (
    <div className='about-us-section'>
      <img src={aboutUsLogo} alt='About Us Logo' className='about-us-logo'></img>
      <div className='about-us-content'>
        <div className='about-us'>
          <img src={aboutUsHeadingImage} alt='About Us Heading' className='about-us-heading-logo'></img>
          <div className='about-us-text'>
            <p>Welcome to Sky Vista Airlines, where your journey begins with excellence. At Sky Vista, we are dedicated to making your travel experience seamless, enjoyable, and memorable.</p>
            <br></br>
            <p>Founded with a passion for aviation and a commitment to exceptional service, Sky Vista Airlines combines cutting-edge technology with a customer-first approach. Our state-of-the-art booking system is designed to provide you with the most convenient, user-friendly experience, ensuring that your travel arrangements are handled with ease.</p>
          </div>
        </div>
        <div className='our-mission'>
          <img src={ourMissionLogo} alt='Our Mission' className='our-mission-logo'></img>
          <p>Our mission is simple: to connect you to the world with the highest level of convenience, comfort, and reliability. We believe that travel should be more than just a destination; it should be an experience. From booking your flight to arriving at your destination, we strive to make every step of your journey as smooth as possible.</p>
        </div>
        <div className='what-sets-us-apart'>
          <img src={whatSetsUsApart} alt="What Set's Us Apart" className='what-sets-us-apart-logo'></img>
          <p>1. <b>Intuitive Booking System</b> : Our advanced platform allows you to search, check flight status and book flights effortlessly. Whether you’re planning a quick business trip or a leisurely vacation, our system ensures you find the best options tailored to your needs.</p>
          <br></br>
          <p>2. <b>Exceptional Service</b> : At Sky Vista, customer satisfaction is our top priority. Our dedicated support team is available around the clock to assist you with any inquiries or concerns, providing personalized service every step of the way.</p>
          <br></br>
          <p>3. <b>Global Reach, Local Touch : </b> With a vast network of destinations around the globe, we offer you the flexibility to travel anywhere you desire. Despite our extensive reach, we pride ourselves on offering a personalized experience that makes you feel valued and cared for.</p>
          <br></br>
          <p>4. <b>Innovation and Technology : </b> We continuously invest in the latest technology to enhance your travel experience. Our booking system integrates advanced features and real-time updates to keep you informed and in control of your journey.</p>
        </div>
        <div className='our-commitment'>
          <h1 className='our-commitment-heading'>Our Commitment to You</h1>
          <img src={commitmentLogo} alt='Commitment' className='commitment-logo'></img>
          <p>We are committed to transparency, integrity, and excellence. Our straightforward booking process and clear policies ensure that there are no surprises—just a smooth and enjoyable travel experience.</p>
          <br></br>
          <p>Thank you for choosing Sky Vista Airlines. We look forward to taking you to new heights and making every journey a memorable one. Safe travels!</p>
          <br></br>
          <p>For any questions or support, please contact our customer service team at skyvista@gmail.com, and we’ll be happy to assist you.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsComponent
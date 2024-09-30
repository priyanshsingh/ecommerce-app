import React from 'react';
import './ThankYou.css'; // Import the CSS file
import Navbar from './Navbar';
// import thankYouImage from './assets/thankyou.png'; // Adjust the path as necessary

const ThankYou = () => {
  return (
    <>
      <Navbar />
      <div className="thank-you-container">
        <img src="https://media.istockphoto.com/id/683943904/vector/the-word-thank-you-vector-banner-with-the-text-colored-rainbow.jpg?s=612x612&w=0&k=20&c=lJFNtBn_liL0Mx3rgHqPN5C0HtiQqAKNYTnXOpRb2tQ="
          alt="Thank You"
          className="thank-you-image"
          style={{ "height": "350px", "width": "550px" }} />
        <h1 className="thank-you-title">Thank You for Your Purchase!</h1>
        <p className="thank-you-message">Your order has been successfully processed.</p>
      </div>
    </>
  );
};

export default ThankYou;

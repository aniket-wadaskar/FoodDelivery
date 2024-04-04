import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
import './PaymentPage.css'; // Import CSS file for styling
 
const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const history = useHistory(); // Initialize useHistory hook
 
  const handlePayment = () => {
    setTimeout(() => {
      setIsPaid(true);
      setTimeout(() => {
        setIsPaid(false); // Reset isPaid after 3 seconds
        history.push('/viewproducts'); // Redirect to home page after payment
      }, 3000); // Pop-up message for 3 seconds
    }, 2000); // Simulating a 2-second delay before payment success
  };

  const handleCancel=()=>{
    history.push('/cart');
  }
 
  return (
    <div className="container"> {/* Add a container class */}
      <div className="content"> {/* Add a content class */}
        {isPaid ? (
          <div className="popup"> {/* Add a popup class for the pop-up message */}
            <h2>Order Successfully Placed!</h2>
            <p>Thank you for your purchase.</p>
          </div>
        ) : (
          <div>
            <h2>Cash On Delivery</h2>
            <p>Please keep the exact amount ready for the delivery person.</p>
 
            <button onClick={handlePayment} style={{ backgroundColor: 'green', color: 'white' }}>Confirm</button>
            
            <button onClick={handleCancel} style={{ backgroundColor: 'green', color: 'white' }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default PaymentPage;

import React from 'react';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
//used to display homepage
const Homepage = () => {
   const history = useHistory();

   const [isHovering, setIsHovering] = useState(false);


   //used to handle Mouse Over Event
   const handleMouseOver = () => {

      setIsHovering(true);

   };


   //used to Handle Mouse Out Event
   const handleMouseOut = () => {

      setIsHovering(false);

   };

   const StartPage = () => {

      sessionStorage.removeItem("id");
      history.push("/nav");
   }

   return (
      <div >
         <div className="btnstart">
            <button onClick={() => StartPage()}><h1>Get Started</h1></button>
         </div>
       
        
      </div>
   )

}
//exporting home page
export default Homepage;
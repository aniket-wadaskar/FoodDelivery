import React, { useState, useEffect } from 'react';
const AdminLogOut = () => {
    const [logoutMessage, setLogoutMessage] = useState(null);

    useEffect(() => {
        // Simulating logout success message
        setLogoutMessage("");
        // Simulating delay before redirecting
        setTimeout(() => {
            // Redirecting to another page using window.location.href
            window.location.href = '/nav';
        },); // Redirect after 2 seconds
    }, []); // Run effect only once after initial render

    return (
        <div>
            {logoutMessage && <p>{logoutMessage}</p>}
            {/* You can include additional content here if needed */}
        </div>
    );
};

export default AdminLogOut;
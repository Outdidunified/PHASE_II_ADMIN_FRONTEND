import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Header = ({ handleLogout }) => {
  
  useEffect(() => {
    // Event handler for 'minimize' button click and touch
    const handleToggleSidebar = () => {
      $('body').toggleClass('sidebar-icon-only'); // Toggle sidebar class using jQuery
    };

    // Attach event listener for the 'minimize' button
    $('[data-toggle="minimize"]').on("click touchstart", handleToggleSidebar);

    // Clean up event listener when component unmounts
    return () => {
      $('[data-toggle="minimize"]').off("click touchstart", handleToggleSidebar);
    };
  }, []);
  
  return (
    // <!-- Navbar -->
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
       <Link className="navbar-brand brand-logo mr-5" href="index.html"><img src="../../images/dashboard/EV-CLIENT-ADMIN.png" className="mr-2" alt="logo" style={{paddingLeft:10}}/></Link>
       <Link className="navbar-brand brand-logo-mini" href="index.html"><img src="../../images/dashboard/EV_Logo_16-12-2023.png" alt="logo"/></Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span className="icon-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i className="icon-ellipsis"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
            <button className="dropdown-item" onClick={handleLogout}>
               <i className="ti-power-off text-primary"></i>
               Logout
             </button>
            </div>
          </li>
        </ul>
       <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
         <span className="icon-menu"></span>
       </button>
     </div>
   </nav>
  );
};

export default Header

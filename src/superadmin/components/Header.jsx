import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Header = ({ handleLogout }) => {
  const [reloadCount, setReloadCount] = useState(null);

  useEffect(() => {
    // Get the current reload count from localStorage
    const count = localStorage.getItem('reloadCount');
    const newCount = count !== null ? parseInt(count) + 0 : 1;

    // Update the reload count in localStorage
    localStorage.setItem('reloadCount', newCount);

    // Set the reload count state
    setReloadCount(newCount);
  }, []);

  useEffect(() => {
    if (reloadCount === null) {
      // Event handler for 'minimize' button click and touch
      const handleToggleSidebar = () => {
        $('body').toggleClass('sidebar-icon-only');
      };

      // Attach event listener for the 'minimize' button
      $('[data-toggle="minimize"]').on("click touchstart", handleToggleSidebar);

      // Clean up event listener when component unmounts
      return () => {
        $('[data-toggle="minimize"]').off("click touchstart", handleToggleSidebar);
      };
    }
  }, [reloadCount]);

  useEffect(() => {
    // Event handler for 'offcanvas' button click and touch
    const handleToggleOffcanvas = () => {
      $('.sidebar-offcanvas').toggleClass('active');
    };
  
    // Attach event listener for the 'offcanvas' button
    $('[data-toggle="offcanvas"]').on("click touchstart", handleToggleOffcanvas);
  
    // Clean up event listener when component unmounts
    return () => {
      $('[data-toggle="offcanvas"]').off("click touchstart", handleToggleOffcanvas);
    };
  }, [reloadCount]);

  const handleMinimizeClick = () => {
    const handleToggleSidebar = () => {
      $('body').toggleClass('sidebar-icon-only');
    };
  
    handleToggleSidebar();
  
    // Set reloadCount to null for 2 seconds, then set to 1
    setReloadCount(null);
    setTimeout(() => {
      setReloadCount(0); // or any other value to indicate that the sidebar toggle should be hidden
    }, 1000);
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo mr-5" to="/">
          <img src="../../images/dashboard/EV-SUPER-ADMIN-1.png" className="mr-2" alt="logo" style={{ paddingLeft: 10 }} />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img src="../../images/dashboard/EV_Logo_16-12-2023.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={handleMinimizeClick}>
          <span className="icon-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-toggle="dropdown">
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

export default Header;

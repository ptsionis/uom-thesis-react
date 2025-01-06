import React from "react";

import "./AdminPendingButton.css";

const AdminPendingButton = ({ toggleShowAdminPending }) => {
  return (
    <button
      className="main-menu-button admin-pending-button"
      onClick={toggleShowAdminPending}
    >
      Pending Questions
    </button>
  );
};

export default AdminPendingButton;

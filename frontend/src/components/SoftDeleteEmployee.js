import React from "react";
import axios from "axios";

const SoftDeleteEmployee = ({ employeeId, onDelete }) => {
  const handleSoftDelete = async () => {
    try {
      const response = await axios.post(
        `employees/employees/${employeeId}/soft-delete/`
      );
      alert(response.data.message);
      if (onDelete) {
        onDelete(employeeId); // Call the parent callback to update UI
      }
    } catch (error) {
      console.error("Error soft deleting the employee:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <button
      onClick={handleSoftDelete}
    />
  );
};

export default SoftDeleteEmployee;

import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ConfirmDeleteModal({
  handleDeleteConfirm,
  handleCancel,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = async () => {
    try {
      await handleDeleteConfirm();
      setIsOpen(false);
      toast.success("Link deleted successfully!");
    } catch (error) {
      toast.error("Error deleting link!");
    }
  };

  return (
    <dialog id="my_delete_modal" className={`modal ${isOpen ? "active" : ""}`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Delete Confirmation</h3>
        <p className="py-4">Are you sure you want to delete this link?</p>
        <div className="modal-action flex justify-end">
          <button className="btn btn-red mr-2" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

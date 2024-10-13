/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "../../../assets/svg/common/DeleteIcon";
import EditIcon from "../../../assets/svg/common/EditIcon";
import DeleteModal from "../common/DeleteModal";
import { formatDate } from "../common/formatDate";

export default function IncomeItem({ income, onEditIncome, onDeleteIncome }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    onDeleteIncome(income);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteClick={handleDelete}
          onCancelClick={() => setIsDeleteModalOpen(false)}
        />
      )}
      <div className="flex justify-between items-center py-2 relative group cursor-pointer">
        <div>
          <h3 className="text-base font-medium leading-7 text-gray-600">
            {income.category}
          </h3>
          <p className="text-xs text-gray-600">{formatDate(income.date)}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
            BDT {income.amount}
          </p>

          <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
            <button
              className="hover:text-teal-600"
              role="button"
              title="Edit Button"
              onClick={() => onEditIncome(income)}
            >
              <EditIcon />
            </button>

            <button
              className="hover:text-red-600"
              role="button"
              title="Delete"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

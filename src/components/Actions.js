import React from "react";

const Actions = ({
  id,
  onEdit,
  onDelete,
  onMoreInfo,
  moreInfoText,
  showEdit = true,
  showDelete = true,
  showMoreInfo = true,
}) => {
  return (
    <div>
      {showEdit && (
        <button
          onClick={() => onEdit(id)}
          className="p-2 bg-green-500 text-white rounded mr-2"
        >
          Редактировать
        </button>
      )}
      {showDelete && (
        <button
          onClick={() => onDelete(id)}
          className="p-2 bg-red-500 text-white rounded mr-2"
        >
          Удалить
        </button>
      )}
      {showMoreInfo && (
        <button
          onClick={() => onMoreInfo(id)}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          {moreInfoText}
        </button>
      )}
    </div>
  );
};

export default Actions;

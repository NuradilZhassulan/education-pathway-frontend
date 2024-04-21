import Actions from "./Actions";

const DataTable = ({
  data,
  tableName,
  tableActions,
  onEdit,
  onDelete,
  showMoreInfo,
  onMoreInfo,
  onMoreInfoText,
}) => (
  <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            {tableName}
          </th>
          <th scope="col" className="px-6 py-3">
            {tableActions}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">
              {item.class_?.name} {item.name}
            </td>
            <td>
              <Actions
                id={item.id}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
                onMoreInfo={() => onMoreInfo(item.id)}
                moreInfoText={onMoreInfoText}
                showMoreInfo={showMoreInfo}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;

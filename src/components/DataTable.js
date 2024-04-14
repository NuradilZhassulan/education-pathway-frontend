import Actions from "./Actions";

const DataTable = ({
  data,
  tableName,
  tableActions,
  onEdit,
  onDelete,
  onMoreInfo,
  onMoreInfoText
}) => (
  <table className="w-full text-left mt-4">
    <thead>
      <tr>
        <th>{tableName}</th>
        <th>{tableActions}</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.class_?.name} {item.name}</td>
          <td>
            <Actions
              id={item.id}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
              onMoreInfo={() => onMoreInfo(item.id)}
              moreInfoText={onMoreInfoText}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;

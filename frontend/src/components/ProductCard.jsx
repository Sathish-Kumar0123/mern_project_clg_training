    export default function ProductCard({ data, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow">
      <div>
        <h3 className="font-bold">{data.name}</h3>
        <p className="text-sm text-gray-600">Idx: {data.idx}</p>
        <p className="text-sm text-gray-500">Price: ₹{data.price}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="border px-3 py-1 rounded hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(data._id)}
          className="border px-3 py-1 rounded hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
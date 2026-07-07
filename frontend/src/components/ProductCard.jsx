export default function ProductCard({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-5 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Product Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full text-xl">
              📦
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {data.name}
              </h2>

              <p className="text-gray-500">
                Product Information
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-sm text-gray-500">Product ID</p>
              <p className="font-semibold text-gray-800">
                {data.idx}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{data.price}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(data)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete(data._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
          >
            🗑 Delete
          </button>
        </div>

      </div>
    </div>
  );
}

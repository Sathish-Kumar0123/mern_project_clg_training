export default function OrderCard({ data, onEdit, onDelete }) {

  const userName = data.user?.name || "No User";
  const userEmail = data.user?.email || "";

  const firstProduct = data.products?.[0];

  const productName = firstProduct?.product?.name || "No Product";
  const productPrice = firstProduct?.product?.price || 0;
  const quantity = firstProduct?.quantity || 0;

  const total = productPrice * quantity;

  return (

    <div className="group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 mb-5 shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold text-white">
            👤 {userName}
          </h2>

          <p className="text-slate-400">
            {userEmail}
          </p>

          <div className="mt-4 space-y-2">

            <p className="text-cyan-300">
              📦 Product :
              <span className="text-white ml-2">
                {productName}
              </span>
            </p>

            <p className="text-slate-300">
              Quantity :
              <span className="font-semibold text-white ml-2">
                {quantity}
              </span>
            </p>

            <p className="text-slate-300">
              Price :
              <span className="font-semibold text-green-400 ml-2">
                ₹{productPrice}
              </span>
            </p>

            <p className="text-lg font-bold text-yellow-400">
              Total : ₹{total}
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(data)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
          >
            ✏ Edit
          </button>

          <button
            onClick={() => onDelete(data._id)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:scale-105 transition"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>

  );
}
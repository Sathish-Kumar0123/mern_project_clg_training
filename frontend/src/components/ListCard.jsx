export default function ListCard({ data, onEdit, onDelete }) {
  return (
    <div className="group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-5 mb-4 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="text-xl font-bold text-white">
            {data.name}
          </h3>

          <p className="text-slate-300 mt-1">
            📧 {data.email}
          </p>

          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
            Age : {data.age}
          </span>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(data)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-105 transition"
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
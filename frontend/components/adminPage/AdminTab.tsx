export function AdminsTab() {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Manage Admins</h1>
      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition">
          + Add Admin
        </button>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition">
          Delete Admin
        </button>
      </div>
    </div>
  );
}
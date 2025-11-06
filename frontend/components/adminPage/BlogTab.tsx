export function BlogsTab() {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Manage Blogs</h1>
      <p className="text-white/80 mb-4">Add, edit, or delete blogs from this section.</p>
      <button className="px-4 py-2 mx-4 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition">
        + Add New Blog
      </button>
      <button className="px-4 py-2 mx-4 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition">
        - Delete Blog
      </button>
      <button className="px-4 py-2 mx-4 bg-yellow-500 hover:bg-yellow-600 rounded-xl font-semibold transition">
        * Edit Blog
      </button>
    </div>
  );
}
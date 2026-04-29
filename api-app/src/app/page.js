"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    image: ""
  });
  const [editId, setEditId] = useState(null);

  const getData = async () => {
    const res = await fetch("/api/getdata");
    const data = await res.json();
    setBooks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.image) return;

    if (editId) {
      await fetch("/api/editdata", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editId })
      });
      setEditId(null);
    } else {
      await fetch("/api/getdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({ title: "", author: "", image: "" });
    getData();
  };

  const handleDelete = async (id) => {
    await fetch("/api/deletedata", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    getData();
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4 md:px-10 py-8">

      {/* HEADER */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
           Book Manager
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Manage your books with a modern premium UI
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">

        {/* LEFT - BOOK LIST */}
        <div className="flex-1 space-y-6">

          {books.length === 0 && (
            <div className="text-center py-20 bg-white/60 backdrop-blur-lg rounded-2xl shadow">
              <p className="text-gray-400 text-lg">
                No books added yet 📭
              </p>
            </div>
          )}

          {books.map((book) => (
            <div
              key={book.id}
              className="group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 shadow hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >
              <img
                src={book.image}
                className="w-full sm:w-28 h-40 object-cover rounded-xl group-hover:scale-105 transition"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {book.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {book.author}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="px-4 py-1.5 text-sm rounded-lg text-white bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(book.id)}
                    className="px-4 py-1.5 text-sm rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - FORM */}
        <div className="w-full lg:w-[360px]">
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-6 sticky top-6">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editId ? "✏️ Edit Book" : "Add Book"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Book Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

              <input
                type="text"
                placeholder="Author Name"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

              {form.image && (
                <img
                  src={form.image}
                  className="w-full h-44 object-cover rounded-lg shadow"
                />
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-gray-900 text-white font-semibold hover:scale-[1.02] transition"
              >
                {editId ? "Update Book" : "Add Book"}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
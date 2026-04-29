import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src",
  "app",
  "_data",
  "db.json"
);

export async function PUT(req) {
  try {
    const updatedBook = await req.json();

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    const index = data.books.findIndex(
      (b) => b.id === updatedBook.id
    );

    if (index === -1) {
      return Response.json({ error: "Not found" });
    }

    data.books[index] = updatedBook;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json(updatedBook);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
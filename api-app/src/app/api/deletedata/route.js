import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src",
  "app",
  "_data",
  "db.json"
);

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    data.books = data.books.filter((b) => b.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ message: "Deleted" });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
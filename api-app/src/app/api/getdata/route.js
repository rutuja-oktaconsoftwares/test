import fs from "fs";
import path from "path";

//  point to _data folder
const filePath = path.join(
  process.cwd(),
  "src",
  "app",
  "_data",
  "db.json"
);

// GET
export async function GET() {
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    // ✅ return ONLY array
    return Response.json(data.books);
  } catch (err) {
    console.error(err);
    return Response.json([]);
  }
}

// POST
export async function POST(req) {
  try {
    const newBook = await req.json();

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    newBook.id = Date.now();
    data.books.push(newBook);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json(newBook);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message });
  }
}
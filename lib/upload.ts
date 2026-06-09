import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 5 * 1024 * 1024;

export async function saveUpload(file: File, folder = "uploads") {
  if (!allowed.has(file.type)) throw new Error("Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.");
  if (file.size > maxBytes) throw new Error("Ảnh không được vượt quá 5MB.");
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const dir = path.join(process.cwd(), "public", folder);
  await mkdir(dir, { recursive: true });
  const filename = `${Date.now()}-${randomUUID()}.${ext}`;
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));
  return `/${folder}/${filename}`;
}

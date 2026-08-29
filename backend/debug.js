import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

console.log("Debug starting...");
import("./index.js").then(() => {
  console.log("Imported index.js successfully");
}).catch((err) => {
  console.error("Error importing index.js:", err);
});

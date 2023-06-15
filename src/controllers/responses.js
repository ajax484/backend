import { fileURLToPath } from "url";
import path, { dirname } from "path";

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const flwResponse = (request, response) => {
  console.log(__dirname, "..", "views", "index.html");
  const filePath = path.resolve(__dirname, "..", "views", "index.html");
  response.sendFile(filePath);
};

export { flwResponse };

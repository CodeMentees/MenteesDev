import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API", version: "1.0.0" },
  },
  apis: ["./controllers/*.js"],
};

try {
  const specs = swaggerJsdoc(options);
  let md = "# API_CONTRACT.md\n\n";
  md += "| Module | Method | Path | Auth required? | Request body/params shape | Response shape (success) | Response shape (error) | Frontend Usage |\n";
  md += "| ------ | ------ | ---- | -------------- | ------------------------- | ------------------------ | ---------------------- | -------------- |\n";

  if (specs.paths) {
    for (const [path, methods] of Object.entries(specs.paths)) {
      for (const [method, details] of Object.entries(methods)) {
        const moduleName = details.tags ? details.tags[0] : "Unknown";
        const authReq = details.security ? "Yes" : "Check Route";
        
        // Request Shape
        let reqShape = "None";
        if (details.requestBody) {
          reqShape = "JSON Body";
          if (details.requestBody.content && details.requestBody.content['multipart/form-data']) reqShape = "FormData";
        }
        if (details.parameters && details.parameters.length > 0) {
          const params = details.parameters.map(p => p.name).join(', ');
          reqShape = reqShape === "None" ? `Params: ${params}` : `${reqShape} + Params: ${params}`;
        }
        
        // Response Shapes
        const resSuccess = details.responses && details.responses['200'] ? details.responses['200'].description : (details.responses && details.responses['201'] ? details.responses['201'].description : "N/A");
        const resError = details.responses && details.responses['400'] ? "400 Error" : (details.responses && details.responses['404'] ? "404 Error" : (details.responses && details.responses['500'] ? "500 Error" : "N/A"));

        // Clean up text
        const cleanDesc = (resSuccess || '').replace(/[\r\n|]/g, " ").trim();
        
        md += `| ${moduleName} | ${method.toUpperCase()} | \`${path}\` | ${authReq} | ${reqShape} | ${cleanDesc} | ${resError} | Unknown |\n`;
      }
    }
  } else {
    md += "| Error | No paths found | | | | | | |\n";
  }

  fs.writeFileSync('API_CONTRACT.md', md);
  console.log('Contract generated successfully!');
} catch (e) {
  console.error("Error:", e);
}

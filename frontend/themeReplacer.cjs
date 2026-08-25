const fs = require('fs');

let content = fs.readFileSync('src/Pages/Course/CourseManagement.jsx', 'utf8');

// Replace bg-[#0f172a] and bg-gray-900 with var(--dash-bg) or var(--dash-panel)
content = content.replace(/className="([^"]*)bg-\[\#0f172a\]([^"]*)"/g, 'className="$1$2" style={{ backgroundColor: "rgb(var(--dash-bg))" }}');
content = content.replace(/className="([^"]*)bg-\[\#0f172a\]\/80([^"]*)"/g, 'className="$1$2" style={{ backgroundColor: "rgba(var(--dash-bg), 0.8)" }}');

// Replace bg-gray-900 and bg-gray-800
content = content.replace(/className="([^"]*)bg-gray-900\/50([^"]*)"/g, 'className="$1$2" style={{ backgroundColor: "rgba(var(--dash-panel), 0.5)" }}');
content = content.replace(/className="([^"]*)bg-gray-900([^"]*)"/g, 'className="$1$2" style={{ backgroundColor: "rgb(var(--dash-panel))" }}');
content = content.replace(/className="([^"]*)bg-gray-800([^"]*)"/g, 'className="$1$2" style={{ backgroundColor: "rgb(var(--surface-2))" }}');
content = content.replace(/className="([^"]*)bg-gray-800\/50([^"]*)"/g, 'className="$1$2" style={{ backgroundColor: "rgba(var(--surface-2), 0.5)" }}');

// Text colors
content = content.replace(/text-slate-200/g, '');
content = content.replace(/className="([^"]*)text-white([^"]*)"/g, 'className="$1$2" style={{ color: "rgb(var(--text-primary))" }}');
content = content.replace(/className="([^"]*)text-gray-400([^"]*)"/g, 'className="$1$2" style={{ color: "rgb(var(--text-secondary))" }}');
content = content.replace(/className="([^"]*)text-gray-500([^"]*)"/g, 'className="$1$2" style={{ color: "rgb(var(--text-secondary))" }}');

// Borders
content = content.replace(/className="([^"]*)border-gray-800([^"]*)"/g, 'className="$1$2" style={{ borderColor: "rgba(var(--dash-border))" }}');
content = content.replace(/className="([^"]*)border-gray-700([^"]*)"/g, 'className="$1$2" style={{ borderColor: "rgba(var(--dash-border))" }}');
content = content.replace(/className="([^"]*)border-gray-600([^"]*)"/g, 'className="$1$2" style={{ borderColor: "rgba(var(--dash-border))" }}');

fs.writeFileSync('src/Pages/Course/CourseManagement.jsx', content);
console.log('Replaced themes');

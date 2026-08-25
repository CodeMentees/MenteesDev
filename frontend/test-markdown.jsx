import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { renderToString } from 'react-dom/server';

const markdown = `
Here is some code:
\`\`\`javascript
const a = 1;
\`\`\`

And HTML code:
\`\`\`html
<div>Hello</div>
\`\`\`

And no language:
\`\`\`
test
\`\`\`
`;

function Test() {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          // React Markdown v9+ removed inline prop, so checking if match exists is better
          // Also need to handle no language code blocks
          // We can check if parent is pre
          
          const isBlock = node && node.position && node.position.start.column === 1; 

          return match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              className="rounded-xl shadow-lg my-6"
              {...props}
            />
          ) : (
            <code className={`${className || ''} bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-sm`} {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
console.log(renderToString(<Test />));

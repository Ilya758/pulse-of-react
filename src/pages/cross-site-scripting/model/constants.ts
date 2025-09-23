export const REFLECTED_XSS_CODE = `
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const query = req.query.q || '';
  // WARNING: This is a vulnerable code snippet.
  // The user's query is directly included in the response without sanitization.
  res.send('<h1>Search Results for: ' + query + '</h1>');
});

app.listen(3000, () => console.log('Server running on port 3000'));
`;

export const STORED_XSS_CODE = `
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let comments = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  // WARNING: This is a vulnerable code snippet.
  // The comment is stored without sanitization.
  comments.push(comment);
  res.redirect('/comments');
});

app.get('/comments', (req, res) => {
  const commentsHtml = comments.map(c => \`<p>\${c}</p>\`).join('');
  res.send('<h1>Comments</h1>' + commentsHtml);
});

app.listen(3000, () => console.log('Server running on port 3000'));
`;

export const DOM_XSS_CODE = `
import React, { useEffect, useState } from 'react';

const VulnerableComponent = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromQuery = searchParams.get('name') || '';
    setName(nameFromQuery);
  }, []);

  // WARNING: This is a vulnerable code snippet.
  // The user's input is directly injected into the DOM without sanitization.
  const dangerousHtml = { __html: \`<h2>Hello, \${name}!</h2>\` };

  return (
    <div>
      <h1>Welcome!</h1>
      <div dangerouslySetInnerHTML={dangerousHtml} />
    </div>
  );
};

export default VulnerableComponent;
`;

export const SAFE_DOM_MANIPULATION_CODE = `
import React, { useEffect, useState } from 'react';

const SafeComponent = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromQuery = searchParams.get('name') || '';
    setName(nameFromQuery);
  }, []);

  // React automatically escapes the content, treating it as a string.
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Hello, {name}!</h2>
    </div>
  );
};

export default SafeComponent;
`;

export const DOM_PURIFY_EXAMPLE_CODE = `
import DOMPurify from 'dompurify';

const userInput = '<img src="x" onerror="alert('XSS!')">';

// Sanitize the user input
const sanitizedInput = DOMPurify.sanitize(userInput);

// The output will be '<img src="x">' - the onerror attribute is removed
console.log(sanitizedInput);

// You can then safely insert this into the DOM
const container = document.getElementById('container');
container.innerHTML = sanitizedInput;
`;

export const ENCODE_URI_COMPONENT_EXAMPLE_CODE = `
const userInput = "this & that? <javascript:alert('XSS')>";

// Encode the user input to make it safe for a URL
const encodedInput = encodeURIComponent(userInput);
// encodedInput is now "this%20%26%20that%3F%20%3Cjavascript%3Aalert('XSS')%3E"

const url = \`https://example.com/search?q=\${encodedInput}\`;
// The final URL is safe to use.
console.log(url);
`;

export const SERVER_SIDE_HANDLING_CODE = `
const express = require('express');
const app = express();
const DOMPurify = require('isomorphic-dompurify');

app.get('/search', (req, res) => {
  // Express automatically decodes req.query.q for you.
  const rawQuery = req.query.q;

  // **INCORRECT AND VULNERABLE**
  // const vulnerableResponse = \`<h1>Search results for: \${rawQuery}</h1>\`;

  // **CORRECT AND SAFE**
  // Sanitize the input before rendering it. This removes any dangerous HTML.
  const sanitizedQuery = DOMPurify.sanitize(rawQuery);
  const safeResponse = \`<h1>Search results for: \${sanitizedQuery}</h1>\`;
  
  res.send(safeResponse);
});

app.listen(3000, () => console.log('Server is running'));
`;

export const HTML_ATTRIBUTE_ENCODING_CODE = `
// VULNERABLE: Unencoded input in an attribute
// <div class="\${untrustedInput}">...</div>

// If untrustedInput is '"><script>alert("xss")</script>', the HTML becomes:
// <div class="">
//   <script>alert("xss")</script>
// </div>

// SAFE: Use a library to encode for HTML attributes
// This will escape characters like " > < etc.
// For example, using a hypothetical 'Encoder' library:
const safeAttributeValue = Encoder.encodeForHTMLAttribute(untrustedInput);

// The output would be properly escaped, preventing the script injection.
// <div class="&quot;&gt;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;">...</div>
`;

export const JAVASCRIPT_CONTEXT_ENCODING_CODE = `
// VULNERABLE: Unencoded input in a script block
// <script>
//   const username = '\${untrustedInput}';
// </script>

// If untrustedInput is "'; alert('xss'); //", the script becomes:
// <script>
//   const username = ''; alert('xss'); //'
// </script>

// SAFE: Serialize the data and embed it in the HTML, then parse in JS.
// Use a library on the server to serialize the data.
const serializedData = JSON.stringify({ username: untrustedInput });

// Then in the HTML:
// <div id="init-data" data-user='&lt;!--\${serializedData}--&gt;'></div>

// And in your JavaScript:
const dataElement = document.getElementById('init-data');
// Remove HTML comment wrapper before parsing
const encodedData = dataElement.getAttribute('data-user').slice(4, -3);
const userData = JSON.parse(encodedData);
const username = userData.username;
`;

export const CSS_CONTEXT_ENCODING_CODE = `
// VULNERABLE: Unencoded input in a style attribute
// <div style="width: \${untrustedInput};">...</div>

// If untrustedInput is '10px; background-image: url("javascript:alert('xss')")',
// some browsers may execute the script.

// SAFE: Strict validation and encoding
// The best defense is to avoid this scenario. If unavoidable, use a library
// that is specifically designed to validate and sanitize CSS values.
// Only allow safe characters (e.g., alphanumeric, %, px, em).

// Example of a safe approach:
function isSafeCssValue(value) {
  // A very basic check - a real implementation should be more robust.
  return /^[a-zA-Z0-9_#.:,%s-]+$/.test(value);
}

const safeValue = isSafeCssValue(untrustedInput) ? untrustedInput : 'invalid';

// <div style="width: \${safeValue};">...</div>
`;


import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:5000/api/visitors/track', { method: 'POST' });
  const text = await res.text();
  console.log("Response:", text);
}
test();

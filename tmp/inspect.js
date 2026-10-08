const fs = require("fs");
const code = fs.readFileSync("/tmp/rpc_bundle.js", "utf8");

// Search for any video extensions or URLs
const videoRegex = /[a-zA-Z0-9_\-\.\/]+\.(mp4|webm|mov|ogg|m3u8)/gi;
console.log("Video filenames:", [...new Set(code.match(videoRegex) || [])]);

// Search for assets/
const assetsMatch = code.match(/\/assets\/[a-zA-Z0-9_\-\.]+/gi);
console.log("Assets:", [...new Set(assetsMatch || [])]);

// Search for "renderforest" or "render"
const rf = code.match(/render[a-zA-Z0-9_-]*/gi);
console.log("Render matches:", [...new Set(rf || [])].slice(0, 30));

// Search for video element attributes: src, poster, <video
const videoJSX = code.match(/["']video["']|createElement\("video"\)|type:"video"/gi);
console.log("Video elements:", videoJSX);

// Search for youtube or vimeo or drive links
const links = code.match(/https?:\/\/[^\s"'\`]+/gi);
console.log("External links:", [...new Set(links || [])].filter(l => !l.includes("w3.org") && !l.includes("react")));

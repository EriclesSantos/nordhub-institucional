import {readFile,writeFile} from 'node:fs/promises';
import {build} from 'vite';

await build({build:{ssr:'src/prerender.tsx',outDir:'.prerender',copyPublicDir:false}});
const {render}=await import('../.prerender/prerender.js');
const html=await readFile('dist/index.html','utf8');
const placeholder='<div id="root"></div>';
if(!html.includes(placeholder))throw new Error('The page rendering placeholder was not found.');
await writeFile('dist/index.html',html.replace(placeholder,()=>`<div id="root">${render()}</div>`));
console.log('Page content rendered into static HTML for crawlers and the initial visit.');

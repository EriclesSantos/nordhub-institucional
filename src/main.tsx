import {createRoot,hydrateRoot} from 'react-dom/client';
import Home from './page';
import './globals.css';

const root=document.getElementById('root')!;
if(root.hasChildNodes())hydrateRoot(root,<Home/>);
else createRoot(root).render(<Home/>);

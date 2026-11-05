import {createRoot,hydrateRoot} from 'react-dom/client';
import Home from './page';
import PrivacyNotice from './privacy';
import './globals.css';

const root=document.getElementById('root')!;
if(root.hasChildNodes())hydrateRoot(root,<Home/>);
else createRoot(root).render(<Home/>);

// Independent portal keeps the prerendered home-page markup/hydration intact.
const privacyRoot=document.createElement('div');
privacyRoot.id='privacy-root';
document.body.appendChild(privacyRoot);
createRoot(privacyRoot).render(<PrivacyNotice/>);

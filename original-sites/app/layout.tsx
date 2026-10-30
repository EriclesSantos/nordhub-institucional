import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Nördhub — Ideias ganham forma.',description:'Software house. Desenvolvemos produtos digitais, sistemas e automações que transformam ideias em soluções.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}

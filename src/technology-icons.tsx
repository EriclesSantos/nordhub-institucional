import {Coffee,FileSpreadsheet,FileText,Smartphone,Workflow,Code2} from 'lucide-react';
import {siAndroid,siBluetooth,siReact,siTypescript,siSpringboot} from 'simple-icons';

const brandIcons = {
 Android: siAndroid,
 Bluetooth: siBluetooth,
 React: siReact,
 TypeScript: siTypescript,
 'Spring Boot': siSpringboot,
};

const platformIcons = {
 Java: Coffee,
 Mobile: Smartphone,
 Automação: Workflow,
 PDF: FileText,
 Excel: FileSpreadsheet,
};

export default function TechnologyIcons({technologies}:{technologies:string[]}){
 return <div className="project-tags technology-icons" aria-label="Tecnologias do projeto">
  {technologies.map(technology=>{
   const brand=brandIcons[technology as keyof typeof brandIcons];
   const Icon=platformIcons[technology as keyof typeof platformIcons]||Code2;
   return <span className="technology-icon" key={technology} role="img" aria-label={technology} title={technology}>
    {brand?<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d={brand.path}/></svg>:<Icon size={24} strokeWidth={1.7} aria-hidden="true"/>}
   </span>;
  })}
 </div>;
}

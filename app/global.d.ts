declare module '*.scss';
declare module '*.css';
declare module '*.module.css';
declare module '*.module.scss' {
  type IClassNames = Record<string, string>;
  const classes: IClassNames;
  export = classes;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  /* в части загрузки svg позволяет 
  использовать их как react компоненты */
  import type React from 'react';

  const SVG: React.ReactNode<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

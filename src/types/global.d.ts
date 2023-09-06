import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

declare global {
  declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }

  interface Window {
    coin98?: true;
  }
}

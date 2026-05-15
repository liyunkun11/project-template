/* eslint-disable */
/// <reference types="vite/client" />

declare interface Window {
    [propName: string]: any
}

declare module 'virtual:svg-icons-register' {
  const content: any;
  export default content;
}
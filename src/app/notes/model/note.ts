import { Notebook } from './notebook';

export interface Note{
    id:string;
    title:string;
    text:string;
    notebook:Notebook;
    lastModifiedOn:string;
}
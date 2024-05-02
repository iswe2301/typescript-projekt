// Importerar interface
import { SubjectStyle } from "./subjectstyle";

// Interface för att definiera strukturen för ett kursämne
export interface Subject {
    name: string; // Namn på ämnet
    style: SubjectStyle; // Stilobjekt av typen StyleStyle (interface)
}
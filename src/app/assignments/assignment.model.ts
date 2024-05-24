import { Auteur } from "../auteur/auteur.model";
import { Matiere } from "../matiere/matiere.model";

export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  auteur!: string;
  matiere!: string;
  auteurs!: Auteur;
  matieres!: Matiere;
  note!: string;
  remarques!: string;
}
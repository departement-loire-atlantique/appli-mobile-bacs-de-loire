import { TYPE_EVENEMENT } from './liaison';

export class CommonEvent {
  public datePublication?: string|Date;
  public ligne1?: string;
  public ligne2?: string;
  public ligne3?: string;
  public ligne4?: string;
  public ligne5?: string;
  public ligne6?: string;
}

export class Pertubation extends CommonEvent {
  public type?: string|TYPE_EVENEMENT;
  public icon?: string;
  public label?: string;
  public status?: string|'en cours'|'prévisionnel';
}

export class ApiEvent extends CommonEvent {
  public identifiant?: string;
  public rattachement?: string;
  public nature?: string;
  public type?: string;
  public statut?: string;
  public longitude?: string;
  public latitude?: string;
}

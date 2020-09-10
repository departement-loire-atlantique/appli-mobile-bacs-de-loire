export class Horaire {
    from: string;
    to: string;
    from_first: string;
    from_last: string;
    from_period: string;
    from_message: string;
    to_first: string;
    to_last: string;
}

export class CurrentHoraire {
  firstDepart: string;
  period: string;
  message: string;
  lastDepart: string;
}

export interface Bus {
  sens: number;
  terminus: string;
  infotrafic: boolean;
  temps: string;
  dernierDepart: string;
  tempsReel: string;
  ligne: Ligne;
  arret: Arret;
}

export interface Ligne {
  typeLigne: number;
  numLigne: string;
}

export interface Arret {
  codeArret: string;
}

export interface DisplayBus {
  numeroBus: string;
  sens: number;
  terminus: string;
  tempsList: Array<string>;
}


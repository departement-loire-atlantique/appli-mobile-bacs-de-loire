export interface Liaison {
  id?: string;
  codeHoraire?: string;
  north?: Dock;
  south?: Dock;
}

export interface Direction {
  from?: string;
  to?: string;
  codeHoraire?: string;
  data?: Dock;
}

export interface Dock {
  name?: string;
  webcamIds?: string[];
  codeBus?: string;
  location?: {
    lat?: string,
    lng?: string,
    placeQuery?: string
  };
  address?: string;
}

export enum TYPE_EVENEMENT {
  BRUME = 'Brume',
  MAREE_BASSE = 'Marée basse',
  MAREE_HAUTE = 'Marée haute',
  PANNE = 'Panne',
  VENT = 'Vent fort',
  HOULE = 'Houle',
  GLACE = 'Glaces',
  RAVITAILLEMENT = 'Ravitaillement',
  INCIDENT = 'Incident'
}

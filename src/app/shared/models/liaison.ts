export class Liaison {
    from: string;
    to: string;
    cameraOne: string;
    cameraTwo: string;
    codeBus: string;
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
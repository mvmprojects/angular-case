export class Artist {
    constructor(public id: number, public name: string) {}
}
  
export interface IArtistResponse {
    total: number;
    results: Artist[];
}
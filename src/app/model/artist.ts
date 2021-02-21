export class Artist {
    constructor(public artistId: number, public name: string) {}
}
  
export interface IArtistResponse {
    total: number;
    results: Artist[];
}
import { Client } from "./client";
import { ItemProduit } from "./itemProduit";

export class Caddy {
    public name: string;
    public items: Map<number,ItemProduit> = new Map();
    public client: Client;
    
    constructor(name: string) {
        this.name = name;
    }
}
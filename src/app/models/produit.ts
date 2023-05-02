export interface Produit{
    id: number,
    name: string,
    description: string,
    currentPrice: number,
    promotion: boolean,
    selected: boolean,
    available: boolean,
    photoName: string,
    quantity: number,
    _links: {
        self:{
            href:string
        },
        produit:{
            href:string
        },
        category:{
            href:string
        }
    }
}
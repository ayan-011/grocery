export interface Item {
  id: string;
  name: string;
  unit: string;
  price: number;
  discount: number;
  emoji?: string;
  swatch?: string;
  image?: string | null;
}

export interface NewItemInput {
  name: string;
  unit: string;
  price: number;
  discount: number;
  image?: string | null;
}

export interface CartItem extends Item {
  qty: number;
}

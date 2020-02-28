import { Injectable } from "@angular/core";
import { StorageSercive } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService{

    constructor(public storege: StorageSercive){}

    createOrClearCart() : Cart{
        let cart : Cart = {items: []};
        this.storege.setCart(cart);
        return cart;
    }

    getCart(): Cart{
        let cart: Cart = this.storege.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }
    
    addProduto(prod : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        if (position == -1){
            cart.items.push({quantidade: 1, produto: prod});
        }
        this.storege.setCart(cart);
        return cart;
    }

}
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

        
    removeProduto(prod : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        if (position != -1){
            cart.items.splice(position, 1);
        }
        this.storege.setCart(cart);
        return cart;
    }

        
    increaseQuantity(prod : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        if (position != -1){
            cart.items[position].quantidade++;
        }
        this.storege.setCart(cart);
        return cart;
    }

    decreaseQuantity(prod : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        if (position != -1){
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1){
                cart = this.removeProduto(prod);
            }
        }
        this.storege.setCart(cart);
        return cart;
    }

    total() : number{
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i < cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade; 
        }
        return sum;
    }    
}
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageSercive } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageSercive){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   

        let localUser =  this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if(localUser && requestToAPI){
            // criando cópia da requisição
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else{
            return next.handle(req)   
        }     
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
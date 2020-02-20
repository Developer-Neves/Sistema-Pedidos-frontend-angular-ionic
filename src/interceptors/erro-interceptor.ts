import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageSercive } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageSercive){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('Passou no interceptor');
        return next.handle(req)
        .catch((error, caught) => {
            
            let errorObj = error;

            if (errorObj.error){
                errorObj = errorObj.error;
            }         
            
            /* if(errorObj.status){
                errorObj = JSON.parse(errorObj);
            } */

            switch(errorObj.status){
                case 403: 
                    this.handle403();
                    break;
            }
            
            console.log('Erro detectado pelo interceptor');
            console.log(errorObj);

            return Observable.throw(errorObj);

        }) as any;
    }

    handle403(){        
        this.storage.setLocalUser(null);
        console.log('Passou no interceptor 3');
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
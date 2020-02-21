import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageSercive } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageSercive,
        public alertCtrl: AlertController,
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
        .catch((error, _caugh) => {
            
            let errorObj = error;

            if (errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            switch(errorObj.status){
                
                case 401:
                    this.handle401();
                    break;
                
                case 403: 
                    this.handle403();
                    break;

                default:
                    this.handleDefaultError(errorObj);
                    break;
            }
                             
            console.log('Erro detectado pelo interceptor');
            console.log(errorObj);

            return Observable.throw(errorObj);

        }) as any;
    }

    handle401(){  
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: true,
            buttons: [{ text:'OK'}]
        }) 
        alert.present();
        this.storage.setLocalUser(null);
    }

    handle403(){
        console.log('Passou no handle403');
        this.storage.setLocalUser(null);
    }

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{ text:'OK'}]
        }) 
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
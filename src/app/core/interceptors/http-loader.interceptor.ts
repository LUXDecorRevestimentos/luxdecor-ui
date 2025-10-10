import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "../../shared/loading/loading.service";
import { finalize, Observable } from "rxjs";


@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
    constructor (private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        setTimeout(() => {
            this.loadingService.show();
        }, 0); 

        return next.handle(req).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}
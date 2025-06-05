import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root' 
  })
export class BannerService {

    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    uploadImgs(imgs: any, pathId: string, bannerId: string){
        let params = new HttpParams().set('path_id', pathId);
        if (bannerId) {
          params = params.append('banner_id', bannerId);
        }
        return this.http.post<any>(`${this.apiUrl}/banner/upload`, imgs, { params })
    }

    getImgs(productId: string){
        let params = new HttpParams().set('path_id', productId);
        return this.http.get<any>(`${this.apiUrl}/banner/upload`, { params })
    }

}
    

import { Component } from "@angular/core";

@Component({
    selector: "photo",
    templateUrl: "photo.component.html"
})
export class Photo{
    pageName: string;
    images: string[];
    constructor(){}
    ngOnInit(){
        this.pageName = "photo";
        this.images = ['assets/imgs/1.jpg', "assets/imgs/2.jpg", "assets/imgs/3.jpg", 'assets/imgs/Background.jpg' ];
    }
}
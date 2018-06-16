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
        this.images = ['assets/imgs/one.jpg', 'assets/imgs/two.jpg', 'assets/imgs/three.jpg', 'assets/imgs/Background.jpg'];
    }
}
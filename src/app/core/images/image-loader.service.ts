import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from './image.model';

@Injectable()
export class ImageLoaderService {

    constructor(private http: HttpClient,
        public sanitizer: DomSanitizer ) { }

    getImage(imageUrl: string): Promise<Image> {
        // Calling the API.
        return new Promise((resolve, reject) => {
            this.http.get(imageUrl, { responseType: "blob" })
                .subscribe(imageBlob => {
                    this.readImage(imageBlob)
                        .then((image: Image) => resolve(image));
                });
        });
    }

    // This is needed to convert an image from a blob into a readable format
    // for the image tag.
    readImage(imageFile: any): Promise<Image> {
        return new Promise((resolve, reject) => {
            const displayedImageReader = new FileReader();
            const image = new Image();
            // When the file is completly converted to a readable format
            displayedImageReader.onload = ((e) => {
                image.imageString = e.target['result'];
                image.displayableImage = this.sanitizer.bypassSecurityTrustUrl(image.imageString);
                resolve(image);
            });

            displayedImageReader.readAsDataURL(imageFile);
        });
    }

}

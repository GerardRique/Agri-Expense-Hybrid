import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class ShareManager{

    constructor(private socialSharing: SocialSharing){

    }


    public share(message: string, subject: string, fileURL: string, url: string): Promise<any>{
        return this.socialSharing.share(message, subject, fileURL).then(() => {
            return true;
        }).catch((error) => {
            console.warn(error);
            return error;
        })
    }
}
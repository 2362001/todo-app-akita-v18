import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { TYPE_NOTIFICATION } from "../utils";

@Injectable({
    providedIn:"root"
})

export class CommonService {
    constructor(
        private notification : NzNotificationService,
        private http: HttpClient
    ){
    }

    openNotification(type: string, title: string, description: string) {
        switch (type) {
          case TYPE_NOTIFICATION.SUCCESS:
            this.notification.success(title, description, { nzDuration: 0 })
            break
          case TYPE_NOTIFICATION.ERROR:
            this.notification.error(title, description, { nzDuration: 0 })
            break
          case TYPE_NOTIFICATION.WARNING:
            this.notification.warning(title, description, { nzDuration: 0 })
            break
          case TYPE_NOTIFICATION.INFO:
            this.notification.info(title, description, { nzDuration: 0 })
            break
          default:
            break
        }
      }
}
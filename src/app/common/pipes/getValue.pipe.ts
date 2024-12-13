import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'getValue',
})
@Injectable({
    providedIn: 'root',
})

export class getValuePipe implements PipeTransform {
    transform(value: any, regex = '[a-zA-Z]'): any {
        if(!value){
            return '--'
        }
        const reg = new RegExp(regex, 'g')
        return value.replaceAll(reg, '');
    }
}
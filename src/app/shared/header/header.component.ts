import { Component } from '@angular/core';

@Component({
    selector: 'app-ui-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    scroll(target: string) {
        let element = document.querySelector(target);
        if (element) {
            element.scrollIntoView();
        }
    }

}

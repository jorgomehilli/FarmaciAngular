import { TestBed } from '@angular/core/testing';
import {NavComponent} from './nav.component'
import { AuthService } from '../auth/auth.service';

describe('Component: Nav', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[NavComponent]
        });
    });

    it('Should display logout tab when logged in', () => {
        let fixture = TestBed.createComponent(NavComponent);
        let app = fixture.debugElement.componentInstance;
        let authService = fixture.debugElement.injector.get(AuthService);
        fixture.detectChanges();
        authService.isLoggedIn = true;
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a').textContent).toContain('LOGOUT');
    })
});
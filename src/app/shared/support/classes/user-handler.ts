import { Subscription } from 'rxjs';
import { UserHandlerService } from './../../handlers/user-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import UserOutput from '../interfaces/userOutput.interface';
@Component({
    selector: '',
    template: ''
})
export class UserHandler implements OnInit, OnDestroy {

    userHandlerService: UserHandlerService;

    handlerSubscription!: Subscription;

    currentUser: UserOutput = {
        id: '',
        name: '',
        email: '',
    }
    constructor(
        userHandlerService: UserHandlerService,
    ) {
        this.userHandlerService = userHandlerService
    }
    protected ngOnInitFunction(): void { }
    protected ngOnDestroyFunction(): void { }

    ngOnInit(): void {
        this.ngOnInitFunction()
        this.listenHandler()
    }
    ngOnDestroy(): void {
        this.ngOnDestroyFunction()
        this.destroyHandler
    }
    private listenHandler(): void {
        this.handlerSubscription = this.userHandlerService.registerGetUser().subscribe({
            next: (user: UserOutput) => {
                this.currentUser = user
            }
        })
    };
    private destroyHandler(): void {
        this.handlerSubscription.unsubscribe();
    }
}



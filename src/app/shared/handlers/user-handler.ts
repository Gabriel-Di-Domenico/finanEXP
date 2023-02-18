import { Subscription } from 'rxjs';
import { UserHandlerService } from './user-handler.service';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';

@Injectable({
  providedIn: 'root',
})
export class UserHandler implements OnInit, OnDestroy {
  handlerSubscription!: Subscription;

  currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };
  constructor(private userHandlerService: UserHandlerService) {}
  protected ngOnInitFunction(): void {}
  protected ngOnDestroyFunction(): void {}
  protected execAfterGetUser(): void {}
  protected emit(){
    this.userHandlerService.emit(this.currentUser.id);
  }
  ngOnInit(): void {
    this.ngOnInitFunction();
    this.listenHandler();
  }
  ngOnDestroy(): void {
    this.ngOnDestroyFunction();
    this.destroyHandler();
  }
  private listenHandler(): void {
    this.handlerSubscription = this.userHandlerService.registerGetUser().subscribe({
      next: (user: UserOutput) => {
        this.currentUser = user;
        this.execAfterGetUser();
      },
    });
  }
  private destroyHandler(): void {
    this.handlerSubscription.unsubscribe();
  }
}

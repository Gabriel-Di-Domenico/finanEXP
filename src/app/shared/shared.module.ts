import { FinSDKModule } from './../../fin-sdk/fin-sdk.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [FinSDKModule],
  exports:[FinSDKModule]
})
export class SharedModule {}

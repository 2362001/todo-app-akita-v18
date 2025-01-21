import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
      // This configuration allows the component to access its parent form control container
      // - provide: ControlContainer - registers ControlContainer token for dependency injection
      // - useFactory returns parent ControlContainer by using inject() with skipSelf:true
      // - skipSelf:true means skip the current component's injector and look for parent injector
      // This setup enables nested form groups to work properly by connecting to parent form
    }
  ],  template: `
      <fieldset [formGroupName]="controlKey" style="padding: 1rem;">
        <legend>{{label}}</legend>
        <div class="form-field">
          <label for="zipCode">Zip Code</label>
          <input formControlName="zipCode" type="text" id="zipCode">
        </div>
        <div class="form-field">
          <label for="address">Street</label>
          <input formControlName="street" type="text" id="address">
        </div>
      </fieldset>

  `
})
export class AddressGroupComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, 
      new FormGroup({
        zipCode: new FormControl(''),
        street: new FormControl('')
      }))
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}

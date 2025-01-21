import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AddressGroupComponent } from './address-group/address-group.component'

@Component({
  selector: 'app-form-reuseable',
  standalone: true,
  imports: [ReactiveFormsModule, AddressGroupComponent],
  templateUrl: './form-reuseable.component.html',
  styleUrl: './form-reuseable.component.scss'
})
export class FormReuseableComponent {
  form = new FormGroup({
    displayName: new FormControl('')
  })
  submit() {
    // do whatever you need with it...
    console.log(this.form.value)
    this.form.reset()
  }
}

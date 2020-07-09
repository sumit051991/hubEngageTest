import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  employeeForm: FormGroup; 
  employeeArray: any = [];
  index: any;
  url:any = '';
  arr: FormArray;
  result: any;
  formData: any = {}
  emailPattern: string = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

  alphanumeric = '^([a-zA-Z0-9 _-]+)$';
 

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private toastrService: ToastrService){
    this.employeeForm = this.formBuilder.group({
      profile: [null],
      Name: ['', [Validators.required, Validators.pattern(this.alphanumeric)]],
      Email: ['', [Validators.email, Validators.required, Validators.pattern(this.emailPattern)]],
      Hobbies: this.formBuilder.array([this.createItem()])
    })
  };

  get hobbies() {
    return <FormArray>this.employeeForm.get('Hobbies');
  }


  ngOnInit(){
  }

  saveEmpmloyee(value, i) {
    let hobbies = [];
    for(let data of value.Hobbies) {
       hobbies.push(data.hobbies);
    } 
    value.hobbies = hobbies;
    delete value.Hobbies

    console.log('value', value);
    this.formData= value

  }

  onAddHobbies() {
    this.arr = this.employeeForm.get('Hobbies') as FormArray;
    this.arr.push(this.createItem());
  }

  createItem() {
    return this.formBuilder.group({
      hobbies: ['', Validators.required],
    })
  }
 
  onSelectFile(event) {
    let file = event.target.files[0]
    if(file.type == 'image/jpeg') {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); 
  
        reader.onload = (event) => {
          this.url = reader.result;
        }
      }
    } else {
      this.toastrService.error('Only png, jpeg files are allowed');
    }
    
  }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '@app/models';
import { OrderDeliveryService } from '@app/services';
import { Create, GetCity } from '@app/store/actions';
import { AppState, selectAuthState, selectOrderState } from '@app/store/app.states';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

  formOrder!: FormGroup;
  submitted = false;
  cities: City[] = [];
  citiesReceiver: City[] = [];
  currentLanguage!: string;
  totalPrice: number = 0.0;
  cityPrice1: number = 0.0;
  cityPrice2: number = 0.0;
  getState: any;
  errorMessage!: string;


  constructor(
    private formBuilder: FormBuilder, 
    private _service: OrderDeliveryService, 
    private translate: TranslateService,
    private store: Store<AppState>,
    ) { 
      this.getState = this.store.select(selectOrderState);
    }

  ngAfterViewInit(): void {
    this.currentLanguage = this.translate.currentLang;
    console.log(this.translate.currentLang);
  }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    const defaultLanguage = this.translate.defaultLang;

    this.getState.subscribe((state: any) => {
      console.log(state);
      this.errorMessage = state;
    });
    
    
    this.formOrder = this.formBuilder.group({
        senderName: ['', Validators.required],
        senderPnoneNumber: ['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        pickupAddress: ['', [Validators.required]],
        citySender: ['', [Validators.required]],
        receiverName: ['', Validators.required],
        receiverPhoneNumber: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        dropOffAddress: ['', Validators.required],
        cityReceiver: ['', Validators.required]
      });

    this.getCities();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formOrder.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.formOrder.invalid) {
      return;
    }
    
    const payload = this.formOrder.value;
    this.store.dispatch(new Create(payload));
  }

  onReset(): void {
    this.submitted = false;
    this.formOrder.reset();
  }

  changeCity(event: any) {
    this.cityPrice1 = event;
    this.calcTotalPrice(event);
  }

  changeCityReceiver(event: any) {
    this.cityPrice2 = event;
    this.calcTotalPrice(event);
  }

  calcTotalPrice(price: any) { 
    if(this.cityPrice1 > 0 && this.cityPrice2 > 0) {
      if(this.cityPrice1 == this.cityPrice2) {
        this.totalPrice = price;
      }
      else {
        this.totalPrice = parseFloat(this.cityPrice1.toString()) + parseFloat(this.cityPrice2.toString()) + 10;
      }
    }
  }

  getCities() {
    this._service.getCities().subscribe(data => { this.cities = data; this.citiesReceiver = data; console.log(this.cities); });
  }

}

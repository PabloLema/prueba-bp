import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { BButtonComponent } from '../../../../shared/components/ui/b-button/b-button.component';
import { BInputComponent } from '../../../../shared/components/ui/b-input/b-input.component';
import { DateValidators } from '../../../../shared/validators/date-validators';
import { DateService } from '../../../../core/services/date.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';
import { BDialogComponent } from '../../../../shared/components/ui/b-dialog/b-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ContainerComponent,
    BInputComponent,
    BButtonComponent,
    BDialogComponent,
  ],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss'
})
export class ProductRegisterComponent {
  productRegisterForm: FormGroup;
  private dateValidators: DateValidators;

  messageDialog: string = '';
  showDialog: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
  ) {
    this.dateValidators = new DateValidators(dateService);
    this.productRegisterForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.dateValidators.dateReleaseValidator()]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.setupDateReleaseListener();
    this.addDateRevisionValidator();
  }

  private setupDateReleaseListener(): void {
    this.productRegisterForm.get('date_release')?.valueChanges.subscribe((value) => {
      if (value) {
        const dateRelease = this.dateService.parseDate(value);

        if (this.dateService.isValidDate(dateRelease)) {
          const dateRevision = this.dateService.addOneYear(dateRelease);
          const formattedDateRevision = this.dateService.formatDate(dateRevision);

          this.productRegisterForm.get('date_revision')?.setValue(formattedDateRevision);
        }
      }
    });
  }

  private addDateRevisionValidator(): void {
    this.productRegisterForm.get('date_revision')?.setValidators([
      Validators.required,
      this.dateValidators.dateRevisionValidator(this.productRegisterForm.get('date_release')!)
    ]);
  }

  getFormControl(controlName: string): FormControl {
    return this.productRegisterForm.get(controlName) as FormControl;
  }

  sendForm() {
    this.productRegisterForm.markAllAsTouched();
    if (this.productRegisterForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const product: Product = this.buildProduct();
    this.productService.verifyProductById(product.id).subscribe({
      next: (response) => {
        if (!response) {
          this.createProduct(product);
        } else {
          this.messageDialog = `El producto con el ID ${product.id} ya existe`;
          this.showDialog = true;
        }
      },
      error: (error) => {
        this.messageDialog = `Error al verificar el producto: ${error}`;
        this.showDialog = true;
      },
      complete: () => console.log('Complete'),
    });
  }

  createProduct(product: Product) {
    this.productService.createProduct(product).subscribe({
      next: (product) => {
        this.messageDialog = `Producto creado con éxito: ${product.id} - ${product.name}`;
        this.showDialog = true;
      },
      error: (error) => {
        this.messageDialog = `Error al verificar el producto: ${error}`;
        this.showDialog = true;
      },
      complete: () => console.log('Complete'),
    });
  }

  buildProduct(): Product {
    return {
      id: this.productRegisterForm.get('id')?.value,
      name: this.productRegisterForm.get('name')?.value,
      description: this.productRegisterForm.get('description')?.value,
      logo: this.productRegisterForm.get('logo')?.value,
      date_release: this.dateService.transformDateToISO(this.productRegisterForm.get('date_release')?.value),
      date_revision: this.dateService.transformDateToISO(this.productRegisterForm.get('date_revision')?.value)
    };
  }

  resetForm() {
    this.productRegisterForm.reset();
  }

  onDialogConfirmed(_: boolean) {
    this.resetForm();
    this.showDialog = false;
    this.router.navigate(['products']);
  }
}

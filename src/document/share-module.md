import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlMomentDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgOtpInputModule } from 'ng-otp-input';
import { BaseComponent } from './components/base-component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BreadcrumbsModule, VcsAvatarModule, VcsChartThemeConfigModule, VcsIconModule, VcsInlineMessageModule, VcsPagerModule, VcsToastModule } from 'vcs-material';
import { QRCodeModule } from 'angularx-qrcode';
import { AppBlockCopyDirective } from './directive/app-block-copy.directive';
import { VcsTooltipComponent } from './components/vcs-tooltip/vcs-tooltip.component';
import { PopupConfirmComponent } from './components/popup-confirm/popup-confirm.component';
import { ConvertTimePipe } from './pipes/convert-time.pipe';
import { TowFaAuthenticationComponent } from './components/tow-fa-authentication/tow-fa-authentication.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { NumberDirective } from './directive/input-only-number.directive';
import { CheckPasswordComponent } from './components/check-password/check-password.component';
import { VerifyCapchaComponent } from './components/verify-capcha/verify-capcha.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TableComponent } from './components/table/table.component';
import { DragDropFileComponent } from './components/drag-drop-file/drag-drop-file.component';
import { SearchComponent } from './components/search/search.component';
import { CurrencyDirective } from './directive/input-currency.directive';
import { ConvertMoneyPipe } from './pipes/convert-money.pipe';
import { NumberMaxLengthDirective } from './directive/input-number-max-length.directive';
import { CreateWorkspaceComponent } from './components/create-workspace/create-workspace.component';
import { TrimInputDirective } from './directive/trim-input.directive';
import { DragDropFileExtendComponent } from './components/drag-drop-file-extend/drag-drop-file.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommentComponent } from './components/comment/comment.component';
import { SearchEnumComponent } from './components/search-enum/search-enum.component';
import { SearchNumberComponent } from './components/search-number/search-number.component';
import { SearchStringComponent } from './components/search-string/search-string.component';
import { SearchTextComponent } from './components/search-text/search-text.component';
import { AutofocusDirective } from './directive/auto-focus.directive';
import { SearchInfoComponent } from './components/search-info/search-info.component';
import { BlockCharactersDirective } from './directive/block-charactor.derective';
import { EllipsisCheckDirective } from './directive/ellipsis-check.directive';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { Error403Component } from './components/403/403.component';
import { ProcessDownloadComponent } from './components/process-download/process-download.component';
import { NumberCountDirective } from './directive/number-count.directive';
import { ListNotificationComponent } from './components/list-notification/list-notification.component';
import { DetailsNotifyComponent } from './components/list-notification/details/details.component';
import { RemindPaymentComponent } from './components/remind-payment/remind-payment.component';
import { TooltipDirective } from './directive/tooltip.directive';
import { SearchTimerComponent } from './components/search-timer/search-timer.component';
import { ReplaceAllByRegexDirective } from './directive/replaceAll-by-regex.directive';
import { FormOptionSearchComponent } from './components/form-option-search/form-option-search.component';
import { getValuePipe } from './pipes/getValue.pipe';
import { getUnixPipe } from './pipes/getUnix.pipe';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';

const MODULES = [
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  MatTabsModule,
  MatTreeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRippleModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  TranslateModule,
  ToastrModule,
  NgSelectModule,
  FormsModule,
  ReactiveFormsModule,
  OwlDateTimeModule,
  OwlMomentDateTimeModule,
  OwlNativeDateTimeModule,
  NgOtpInputModule,
  NgxDatatableModule,
  VcsAvatarModule,
  VcsIconModule,
  VcsToastModule,
  BreadcrumbsModule,
  VcsPagerModule,
  VcsInlineMessageModule,
  VcsChartThemeConfigModule,
  QRCodeModule,
  DragDropModule,
  NzCarouselModule
]
@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
  ],
  declarations: [
    ClickOutsideDirective,
    LoadingComponent,
    NoDataComponent,
    BaseComponent,
    ErrorMessageComponent,
    AppBlockCopyDirective,
    VcsTooltipComponent,
    PopupConfirmComponent,
    ConvertTimePipe,
    TowFaAuthenticationComponent,
    VerifyEmailComponent,
    NumberDirective,
    CheckPasswordComponent,
    VerifyCapchaComponent,
    ChangePasswordComponent,
    TableComponent,
    DragDropFileComponent,
    SearchComponent,
    CurrencyDirective,
    ConvertMoneyPipe,
    NumberMaxLengthDirective,
    CreateWorkspaceComponent,
    TrimInputDirective,
    DragDropFileExtendComponent,
    CommentComponent,
    SearchEnumComponent,
    SearchNumberComponent,
    SearchStringComponent,
    SearchTextComponent,
    AutofocusDirective,
    SearchInfoComponent,
    BlockCharactersDirective,
    EllipsisCheckDirective,
    Error403Component,
    ProcessDownloadComponent,
    ListNotificationComponent,
    NumberCountDirective,
    DetailsNotifyComponent,
    RemindPaymentComponent,
    TooltipDirective,
    SearchTimerComponent,
    ReplaceAllByRegexDirective,
    FormOptionSearchComponent,
    getValuePipe,
    getUnixPipe,
    AbbreviateNumberPipe
  ],
  exports: [
    ...MODULES,
    ClickOutsideDirective,
    LoadingComponent,
    NoDataComponent,
    BaseComponent,
    ErrorMessageComponent,
    AppBlockCopyDirective,
    VcsTooltipComponent,
    ConvertTimePipe,
    TowFaAuthenticationComponent,
    VerifyEmailComponent,
    NumberDirective,
    CheckPasswordComponent,
    VerifyCapchaComponent,
    ChangePasswordComponent,
    TableComponent,
    DragDropFileComponent,
    SearchComponent,
    CurrencyDirective,
    ConvertMoneyPipe,
    NumberMaxLengthDirective,
    CreateWorkspaceComponent,
    TrimInputDirective,
    DragDropFileExtendComponent,
    CommentComponent,
    SearchEnumComponent,
    SearchNumberComponent,
    SearchStringComponent,
    SearchTextComponent,
    AutofocusDirective,
    SearchInfoComponent,
    BlockCharactersDirective,
    EllipsisCheckDirective,
    Error403Component,
    ProcessDownloadComponent,
    ListNotificationComponent,
    NumberCountDirective,
    DetailsNotifyComponent,
    RemindPaymentComponent,
    TooltipDirective,
    SearchTimerComponent,
    ReplaceAllByRegexDirective,
    FormOptionSearchComponent,
    getValuePipe,
    getUnixPipe,
    AbbreviateNumberPipe
  ]
})
export class ShareModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, // Import các module cần thiết cho nội bộ SharedModule (nếu có)
  ],
  exports: [
    CommonModule, // Export CommonModule để các module khác có thể dùng
    RouterModule, // Export RouterModule để dùng được RouterLink, RouterOutlet
    NzIconModule, // Export các module của thư viện bên ngoài
    NzLayoutModule,
    NzMenuModule,
  ],
})
export class SharedModule {}
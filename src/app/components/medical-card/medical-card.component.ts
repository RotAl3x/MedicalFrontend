import {Component, inject, Input} from '@angular/core';
import {SettingsService} from "../../admin/services/settings.service";

@Component({
  selector: 'app-medical-card',
  templateUrl: './medical-card.component.html',
  styleUrls: ['./medical-card.component.scss']
})
export class MedicalCardComponent {
  @Input() name: string | null = '';
  @Input() description: string | null = '';
  @Input() photoName: string | null = '';
  @Input() maxWidth: number = 0;
  settingsService = inject(SettingsService);

  photoLink(name: string | null) {
    return this.settingsService.photoLink(name);
  }
}

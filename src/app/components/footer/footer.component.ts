import {Component, inject, OnInit} from '@angular/core';
import {ISettings} from "../../models/settings";
import {SettingsService} from "../../admin/services/settings.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  settings!: ISettings;
  settingsService = inject(SettingsService);

  async ngOnInit() {
    this.settings = await this.settingsService.getSettings();
  }

}

import {Component, inject, OnInit} from '@angular/core';
import {IRoomOrDevice} from "../../models/room-or-device";
import {RoomOrDeviceService} from "../../services/room-or-device.service";
import {MatDialog} from "@angular/material/dialog";
import {RoomOrDeviceUpsertDialogComponent} from "./room-or-device-upsert-dialog/room-or-device-upsert-dialog.component";

@Component({
  selector: 'app-room-or-device-upsert-page',
  templateUrl: './room-or-device-upsert-page.component.html',
  styleUrls: ['./room-or-device-upsert-page.component.scss']
})
export class RoomOrDeviceUpsertPageComponent implements OnInit{

  roomOrDevices: IRoomOrDevice[]=[];
  roomOrDeviceService = inject(RoomOrDeviceService);
  private dialog = inject(MatDialog);

  async ngOnInit() {
    await this.getAllRoomOrDevice();
  }

  async getAllRoomOrDevice(){
    this.roomOrDevices = await this.roomOrDeviceService.getAll();
  }

  openDialog(roomOrDevice?:IRoomOrDevice){
    const dialogRef = this.dialog.open(RoomOrDeviceUpsertDialogComponent, {
      data: roomOrDevice,
    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result) await this.getAllRoomOrDevice();
    });
  }

}

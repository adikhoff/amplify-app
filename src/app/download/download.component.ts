import {Component} from '@angular/core';
import {Storage} from "aws-amplify";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  public downloadUrl: string;
  public downloadName = "reunie2023.zip";

  constructor() {
    this.downloadUrl = "";
    console.log("Getting download url");
    Storage.get(this.downloadName, {download: false}).then((url) => {
      this.downloadUrl = url;
      console.log("Download url: " + url);
    });
  }


}

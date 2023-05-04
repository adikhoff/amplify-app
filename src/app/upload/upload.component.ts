import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Progress} from "../model/progress";
import {Storage} from "aws-amplify";
import {APIService, CreatePhotoInput} from "../API.service";
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../util/user-service";
import {IdService} from "../util/id-service";
import {MockService} from "../util/mock-service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private files: File[] = [];
  uploads: PhotoUrl[] = [];

  constructor(
    private api: APIService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private idService: IdService,
    private mockService: MockService) {
  }

  ngOnInit() {
  }

  public onFileSelected(e: any) {
    this.files = e?.target?.files;
    this.uploads = [];
    this.createUIElementsForUpload();

    this.changeDetectorRef.detectChanges();

    this.insertImagesInUploadUI();
    this.uploadFiles();
  }

  private createUIElementsForUpload() {
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const photoUrl: PhotoUrl = this.mockService.getMockPhotoUrl();
      photoUrl.progress = new Progress();
      photoUrl.file = file;
      this.uploads.push(photoUrl);
    }
  }

  private insertImagesInUploadUI() {
    for (let i = 0; i < this.files.length; i++) {
      const photoUrl = this.uploads[i];
      let image: HTMLImageElement | null = document.getElementById("photo-" + i) as HTMLImageElement;
      image.src = URL.createObjectURL(photoUrl.file!);
      photoUrl.image = image;
    }
  }

  public uploadFiles() {
    try {
      for (let i = 0; i < this.uploads.length; i++) {
        const photoUrl = this.uploads[i];
        this.uploadToStorage(photoUrl);
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  private uploadToStorage(photoUrl: PhotoUrl) {
    const file = photoUrl.file;
    if (file) {
      if (this.userService.userName) {
        const fileExt = file.name.substring(file.name.lastIndexOf("."));
        const fileName = this.userService.userName + "/" + this.idService.generate() + fileExt;

        Storage.put(fileName, file, {
          level: "public",
          progressCallback(progress) {
            photoUrl.progress!.loaded = progress.loaded;
            photoUrl.progress!.total = progress.total;
          }
        }).then((response) => {
          this.removeCompletedFromUploads();
          this.addToDatabase(photoUrl, fileName);
        });
      }
    }
  }

  private removeCompletedFromUploads() {
    this.uploads = this.uploads.filter(pul => pul.progress!.loaded != pul.progress!.total);
  }

// Todo: this should be done in a Lambda
  private addToDatabase(photoUrl: PhotoUrl, fileName: string) {
    const image = photoUrl.image!;
    if (this.userService.userName) {
      let cpi: CreatePhotoInput = {
        user: this.userService.userName,
        filename: fileName,
        width: image.width,
        height: image.height
      };
      this.api.CreatePhoto(cpi).then(() => {
      });
    }
  }

  public calcPercentage(progress: Progress) {
    if (progress.loaded && progress.total) {
      return Math.round((progress.loaded / progress.total) * 100);
    }
    return 0;
  }


}

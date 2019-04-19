import { Component } from '@angular/core';
import { FaTubeService } from './services/fa-tube.service';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variable to store values of input text
  searchValue = '';
  // Variable to store values for paging, default assigned by 1
  p = 1;
  // Array value to store list video as a result of search action
  videos = [];
  // Variable to show or hidden span element notify about yes or no search results
  showVideo = false;
  iimagess = '../assets/not-found.png';
  // Array to execute sort by action
  closeResult: string;
  orders: any[] = [
    { id: 0, name: 'date' },
    { id: 1, name: 'rating' },
    { id: 2, name: 'relevance' },
    { id: 3, name: 'title' },
    { id: 4, name: 'videoCount' },
    { id: 5, name: 'viewCount' }
  ];
  // Variable to store value index of orders with default value assigned by 1
  selected = 0;
  title: any;
  description: any;
  channelName: any;
  // Variable to store string of path display video
  videoPath: string;
  // Variable to store string convert to safe path on iframe
  trustedUrl: any;
  // Variable to store detail of video
  videosdetail: any;
  // Variable to store list of video related
  videosRelated: any = [];
  // Constructor to call Service, funxtion to handle safe url and Modal
  number = '1';
  api = 'AIzaSyB-TJ_7SmJT5_ANaraGDPDRozrwqgkxe3E';
  modalReference = null;
  constructor(
    private fatubeService: FaTubeService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {}
  // Function handle when user press enter
  handleInput() {
    this.fatubeService
      .orderVideos(
        this.orders[this.selected].name,
        this.searchValue,
        this.api,
        this.number
      )
      .subscribe(data => {
        this.videos = data.items;
        if (this.videos.length !== 0) {
          this.showVideo = true;
        } else {
          this.showVideo = false;
        }
      });
    this.videos = [];
  }
  // Function to handle when use proceeds sort by list video
  selectOption(id: number) {
    this.fatubeService
      .orderVideos(
        this.orders[id].name,
        this.searchValue,
        this.api,
        this.number
      )
      .subscribe(data => {
        this.videos = data.items;
        if (this.videos.length !== 0) {
          this.showVideo = true;
        } else {
          this.showVideo = false;
        }
      });
    this.videos = [];
    this.p = 1;
  }
  // Function to handle display or hidden element contain list video
  checkVideo() {
    if (this.searchValue === '') {
      this.videos = [];
      return false;
    }
    return true;
  }
  // Function to handle location, size and css for popup screen for setting order
  openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'myCustomModalClassSetting'
    });
  }
  // Function to handle location, size and css for popup screen for play video
  openVerticallyCenteredPlayVideo(contentPlayVideo) {
    this.modalService.open(contentPlayVideo, {
      centered: true,
      size: 'lg',
      windowClass: 'myCustomModalClassPlayVideo'
    });
  }
  // Function handle even when user clicks image of videos then display popup video
  playVideo(id, description, title, channelname) {
    this.title = title;
    this.description = description;
    this.channelName = channelname;
    this.videoPath = `http://www.youtube.com/embed/${id.videoId}`;
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoPath
    );
    this.fatubeService.playVideos(id.videoId, this.api).subscribe(data => {
      this.videosdetail = data.items;
    });
    this.fatubeService.getRelatedById(id.videoId, this.api).subscribe(data => {
      this.videosRelated = data.items;
    });
  }
  onSubmit(form: NgForm) {
    this.number = form.value.number;
    this.api = form.value.api;
    if (confirm('Choose completed!')) {
      this.fatubeService.checkApiKey(this.api).subscribe(
        data => {},
        (error: any) => {
          alert('Key invalid! Please enter again!');
        },
        () => {
          this.modalReference.close();
        }
      );
    }
  }
}

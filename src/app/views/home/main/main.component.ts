import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {map, Subject, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";

// import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private subject: Subject<number>;

  constructor(private modalService: NgbModal) {

    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000)

    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000)
  }

  private subscription: Subscription | null = null;

  // @ViewChild('popup')
  // popup!:TemplateRef<ElementRef>;

  ngOnInit(): void {
    console.log(environment.production)
    // const myModalAlternative = new bootstrap.Modal('#myModal', {})
    // myModalAlternative.show()

    this.subscription = this.subject
      .subscribe({
        next: (param: number) => {
          console.log('subscriber 1: ', param)
        },
        error: (err: string) => {
          console.log('error blyat ' + err)
        }
      })
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    // this.popupComponent.open();

    // this.modalService.open(this.popup,{});

    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'Main Component'
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {


    // this.subject
    //   .pipe(
    //     map((number) => {
    //       return 'Число: ' + number;
    //     })
    //   )
    //   .subscribe((param: string) => {
    //     console.log('subscriber 2: ', param)
    //   })

  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccService } from 'src/app/services/acc/acc.service';
import { AccLoginData } from '../../../objects/acc';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  data: AccLoginData = new AccLoginData();

  constructor(
    private modalService: NgbModal,
    private accService: AccService,
  ) { }

  ngOnInit(): void {

  }

  openModal( content: any ): void {
    this.modalService.open( content );
  }

  login(): void {
    this.accService.login( this.data );
  }
}

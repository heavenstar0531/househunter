import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  loginMsg: String = '';
  loginUsernameMsg: String = '';
  loginPasswordMsg: String = '';
  username: String = '';
  password: String = '';

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  openModal( content: any ): void {
    this.modalService.open( content );
  }

  login(): void {
  }
}

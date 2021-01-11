import { Component, OnInit } from '@angular/core';
import { News } from '../../models/news.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string;
  news: News[];

  constructor(private userService: UserService) { }

  ngOnInit(): void
  {
    this.username = localStorage.getItem('username');
    this.getAllNews();
  }

  getAllNews(): void
  {
    this.userService.news().subscribe( (val: News[]) => {
      this.news = val;
    });
}

}

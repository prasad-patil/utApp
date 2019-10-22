import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostsService) {}
  posts: Post[] = [];
  loading = true;
  ngOnInit() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
      this.loading = false;
    });
  }
}

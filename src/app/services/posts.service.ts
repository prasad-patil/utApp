import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url = `${environment.apiURL}posts`;
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<Post[]>(this.url);
  }
}

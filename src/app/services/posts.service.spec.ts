import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PostsService } from './posts.service';
import { Post } from '../models/posts.model';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });
    service = TestBed.get(PostsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // #region without fakeAsync
  // it('should send posts requests and return data', () => {
  //   const dummyPosts: Post[] = [
  //     {
  //       id: 1,
  //       body: 'Some',
  //       title: 'Importiant',
  //       userId: 4
  //     },
  //     {
  //       id: 2,
  //       body: 'Some2',
  //       title: 'Not Importiant',
  //       userId: 5
  //     }
  //   ];

  //   service.getPosts().subscribe((posts: Post[]) => {
  //     expect(posts.length).toBe(2);
  //     expect(posts).toEqual(dummyPosts);
  //   });

  //   const request = httpMock.expectOne(service.url);
  //   expect(request.request.method).toBe('GET');
  //   request.flush(dummyPosts);
  // });
  //#endregion

  it('should send posts requests and return data', fakeAsync(() => {
    const dummyPosts: Post[] = [
      {
        id: 1,
        body: 'Some',
        title: 'Importiant',
        userId: 4
      },
      {
        id: 2,
        body: 'Some2',
        title: 'Not Importiant',
        userId: 5
      }
    ];
    let posts: Post[] = [];
    service
      .getPosts()
      .toPromise()
      .then(p => (posts = p));

    const request = httpMock.expectOne(service.url);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);

    tick();

    expect(posts.length).toBe(2);
    expect(posts).toEqual(dummyPosts);
  }));
});

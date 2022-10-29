import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post: object) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePosts(post: any) {
    // Put requires all the data and overwrites the data completely, PUT is widely supported
    // this.http.put(this.url, JSON.stringify({ ...post, isRead: true }));

    // Patch just requires the data that needs to be updated, PATCH is not widely supported
    return this.http.patch(
      this.url + '/' + post.id,
      JSON.stringify({ id: post.id, isRead: true })
    );
  }

  deletePost(postid: number) {
    return this.http.delete(this.url + '/' + postid);
  }
}

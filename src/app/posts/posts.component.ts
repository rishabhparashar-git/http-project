import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        alert('An unexpected error occurred');
        console.log(error);
      }
    );
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = '';
    this.service.createPost(post).subscribe(
      (response: object) => {
        let postToAdd = { ...post, ...response };
        this.posts.splice(0, 0, postToAdd);
      },
      (error: Response) => {
        if (error.status === 400) {
          // this.form.setErrors(error.json());
        } else {
          console.log('An unexpected error occurred');
        }
        console.log(error);
      }
    );
  }

  updatePost(post: any) {
    this.service.updatePosts(post).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert('An unexpected error occurred');
        console.log(error);
      }
    );
  }

  deletePost(post: any) {
    this.service.deletePost(345).subscribe(
      (response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: Response) => {
        if (error.status === 404) {
          alert('this post has already been deleted');
        } else {
          alert('An unexpected error occurred');
          console.log(error);
        }
      }
    );
  }
}

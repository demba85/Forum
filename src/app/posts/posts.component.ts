import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../model/post.model";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService : PostsService, private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts : Post[]) => {
        this.posts = posts;
      }
    )
    this.postService.getPosts();
    this.postService.emitPosts();
  }

  onDeletePost(post : Post) {
    this.postService.removePost(post);
  }

  onLove(post : Post) {
    this.postService.likePost(post);
  }

  notLove(post : Post) {
    this.postService.dislikePost(post);
  }

  onNewPost() {
    this.router.navigate(['/new-post']);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}

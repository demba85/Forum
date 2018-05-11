import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Post} from "../model/post.model";
import * as firebase from "firebase";

@Injectable()
export class PostsService {

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  constructor() {
  }

  emitPosts() {
    this.postSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      })
  }

  createNewPost (newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {

    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  likePost(post : Post) {
    post.loveIts++;
    this.savePosts();
    this.emitPosts();
  }

  dislikePost(post : Post) {
    post.loveIts--;
    this.savePosts();
    this.emitPosts();
  }

}

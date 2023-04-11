import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  bookmarks: any;

  author: string | undefined;
  title: string | undefined;
  urlToImage: string | undefined;
  filteredItems: any[] = [];
  searchTerm: string = '';
  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((data) => {
      this.bookmarks = data;
      console.log('heyyy', this.bookmarks);
      this.filteredItems = [...this.bookmarks.articles];
    });
  }
  addBookmark() {
    const newItem = {
      author: this.author,
      title: this.title,
    };

    if (!this.bookmarks) {
      this.bookmarks = { articles: [] };
    }

    this.bookmarks.articles.push(newItem);
    this.filteredItems = [...this.bookmarks.articles];
    this.author = '';
    this.title = '';
    // this.site_url = '';
    // this.site_category = '';
  }

  filterItems(searchTerm: string) {
    if (!searchTerm) {
      this.filteredItems = this.bookmarks.articles.slice();
    } else {
      this.filteredItems = this.bookmarks.articles.filter(
        (item: { title: any; author: string }) => {
          return (
            (item.author?.toLowerCase() ?? '').includes(
              searchTerm.toLowerCase()
            ) ||
            (item.title?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
          );
        }
      );
    }
    console.log('Search term:', searchTerm);
  }

  deleteItem(item: any) {
    const index = this.bookmarks.articles.indexOf(item);
    if (index > -1) {
      this.bookmarks.articles.splice(index, 1);
      this.filteredItems = this.bookmarks.articles.slice();
    }
  }
}

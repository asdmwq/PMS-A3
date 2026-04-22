import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService, Item, Category, StockStatus } from '../services/inventory.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery = '';
  isLoading = false;
  errorMessage = '';
  showHelp = false;

  categories: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.loadItems();
  }

  // Reload items every time tab becomes active
  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.errorMessage = '';
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = [...this.items];
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load items';
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    this.filteredItems = this.inventoryService.searchItems(this.items, this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredItems = [...this.items];
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  getStockStatusColor(status: StockStatus): string {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'danger';
      default: return 'medium';
    }
  }

  getCategoryIcon(category: Category): string {
    switch (category) {
      case 'Electronics': return 'laptop';
      case 'Furniture': return 'bed';
      case 'Clothing': return 'shirt';
      case 'Tools': return 'hammer';
      default: return 'cube';
    }
  }

  // Navigate to detail page for editing
  goToDetail(item: Item) {
    this.router.navigate(['/detail', item.item_name]);
  }
}

import { Component, OnInit } from '@angular/core';
import { InventoryService, Item, Category, StockStatus } from '../services/inventory.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  // Form model for new item (matches backend database fields)
  newItem: Item = {
    item_id: 0,
    item_name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: 'In Stock',
    featured_item: 0,
    special_note: ''
  };

  categories: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

  featuredItems: Item[] = [];
  allItems: Item[] = [];
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  showHelp = false;
  selectedSegment = 'add';

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.allItems = data;
        this.featuredItems = this.inventoryService.getFeaturedItems(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(error.message || 'Failed to load items', 'error');
        this.isLoading = false;
      }
    });
  }

  addItem() {
    // Validation
    if (!this.newItem.item_name || this.newItem.item_name.trim() === '') {
      this.showMessage('Item Name is required', 'error');
      return;
    }
    if (!this.newItem.supplier_name || this.newItem.supplier_name.trim() === '') {
      this.showMessage('Supplier Name is required', 'error');
      return;
    }
    if (this.newItem.quantity === null || this.newItem.quantity < 0) {
      this.showMessage('Valid Quantity is required', 'error');
      return;
    }
    if (this.newItem.price === null || this.newItem.price < 0) {
      this.showMessage('Valid Price is required', 'error');
      return;
    }

    this.isLoading = true;
    this.inventoryService.createItem(this.newItem).subscribe({
      next: () => {
        this.showMessage('Item added successfully!', 'success');
        this.resetForm();
        this.loadItems(); // Refresh featured items
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(error.message || 'Failed to add item', 'error');
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.newItem = {
      item_id: 0,
      item_name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier_name: '',
      stock_status: 'In Stock',
      featured_item: 0,
      special_note: ''
    };
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 5000);
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
}

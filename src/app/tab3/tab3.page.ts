import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService, Item, Category, StockStatus } from '../services/inventory.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  // Search and edit
  searchName = '';
  foundItem: Item | null = null;
  isEditing = false;

  // Edit form model
  editItem: Item = {
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

  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  showHelp = false;
  selectedSegment = 'edit';

  constructor(private inventoryService: InventoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check for query params from navigation
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchName = params['search'];
        this.searchItem();
      }
    });
  }

  searchItem() {
    if (!this.searchName || this.searchName.trim() === '') {
      this.showMessage('Please enter an item name to search', 'error');
      return;
    }

    this.isLoading = true;
    this.foundItem = null;
    this.isEditing = false;
    this.message = '';

    this.inventoryService.getItemByName(this.searchName.trim()).subscribe({
      next: (data) => {
        this.foundItem = data;
        this.editItem = { ...data }; // Copy for editing
        this.isLoading = false;
        this.showMessage('Item found! You can now edit or delete.', 'success');
      },
      error: (error) => {
        this.showMessage(error.message || 'Item not found', 'error');
        this.isLoading = false;
      }
    });
  }

  updateItem() {
    if (!this.foundItem) {
      this.showMessage('No item selected for update', 'error');
      return;
    }

    // Validation
    if (!this.editItem.item_name || this.editItem.item_name.trim() === '') {
      this.showMessage('Item Name is required', 'error');
      return;
    }
    if (!this.editItem.supplier_name || this.editItem.supplier_name.trim() === '') {
      this.showMessage('Supplier Name is required', 'error');
      return;
    }
    if (this.editItem.quantity === null || this.editItem.quantity < 0) {
      this.showMessage('Valid Quantity is required', 'error');
      return;
    }
    if (this.editItem.price === null || this.editItem.price < 0) {
      this.showMessage('Valid Price is required', 'error');
      return;
    }

    this.isLoading = true;
    const originalName = this.foundItem.item_name;

    this.inventoryService.updateItem(originalName, this.editItem).subscribe({
      next: () => {
        this.showMessage('Item updated successfully!', 'success');
        this.foundItem = null;
        this.isEditing = false;
        this.searchName = '';
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(error.message || 'Failed to update item', 'error');
        this.isLoading = false;
      }
    });
  }

  deleteItem() {
    if (!this.foundItem) {
      this.showMessage('No item selected for deletion', 'error');
      return;
    }

    // Check if it's Laptop (which cannot be deleted)
    if (this.foundItem.item_name === 'Laptop') {
      this.showMessage('The item "Laptop" cannot be deleted (protected by server)', 'error');
      return;
    }

    const confirmed = confirm(`Are you sure you want to delete "${this.foundItem.item_name}"? This action cannot be undone.`);
    if (!confirmed) return;

    this.isLoading = true;
    this.inventoryService.deleteItem(this.foundItem.item_name).subscribe({
      next: (response: any) => {
        this.showMessage(response?.message || 'Item deleted successfully!', 'success');
        this.foundItem = null;
        this.isEditing = false;
        this.searchName = '';
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(error.message || 'Failed to delete item', 'error');
        this.isLoading = false;
      }
    });
  }

  startEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    if (this.foundItem) {
      this.editItem = { ...this.foundItem }; // Reset to original
    }
    this.isEditing = false;
  }

  clearSearch() {
    this.searchName = '';
    this.foundItem = null;
    this.isEditing = false;
    this.message = '';
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

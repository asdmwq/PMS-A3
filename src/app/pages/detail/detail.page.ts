import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService, Item, Category, StockStatus } from '../../services/inventory.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {
  item: Item | null = null;
  isLoading = false;
  isEditing = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  categories: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

  // Edit form
  editForm: Item = {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loadItem(name);
    } else {
      this.message = 'No item name provided';
      this.messageType = 'error';
    }
  }

  loadItem(name: string) {
    this.isLoading = true;
    this.inventoryService.getItemByName(name).subscribe({
      next: (data) => {
        this.item = data;
        this.editForm = JSON.parse(JSON.stringify(data)); // Deep copy
        this.isLoading = false;
      },
      error: (error) => {
        this.message = error.message || 'Failed to load item';
        this.messageType = 'error';
        this.isLoading = false;
      }
    });
  }

  startEdit() {
    if (this.item) {
      // Deep copy item to editForm
      this.editForm = JSON.parse(JSON.stringify(this.item));
    }
    this.isEditing = true;
  }

  cancelEdit() {
    if (this.item) {
      this.editForm = JSON.parse(JSON.stringify(this.item));
    }
    this.isEditing = false;
  }

  saveEdit() {
    if (!this.item) return;

    // Validation
    if (!this.editForm.item_name || this.editForm.item_name.trim() === '') {
      this.showMessage('Item Name is required', 'error');
      return;
    }
    if (!this.editForm.supplier_name || this.editForm.supplier_name.trim() === '') {
      this.showMessage('Supplier Name is required', 'error');
      return;
    }
    if (this.editForm.quantity === null || this.editForm.quantity < 0) {
      this.showMessage('Valid Quantity is required', 'error');
      return;
    }
    if (this.editForm.price === null || this.editForm.price < 0) {
      this.showMessage('Valid Price is required', 'error');
      return;
    }

    this.isLoading = true;
    const originalName = this.item.item_name;
    this.inventoryService.updateItem(originalName, this.editForm).subscribe({
      next: () => {
        this.showMessage('Item updated successfully!', 'success');
        this.isEditing = false;
        this.isLoading = false;
        // Reload using original name (item_name is the key, may not be changeable)
        this.loadItem(originalName);
      },
      error: (error) => {
        this.showMessage(error.message || 'Failed to update item', 'error');
        this.isLoading = false;
      }
    });
  }

  deleteItem() {
    if (!this.item) return;

    if (this.item.item_name === 'Laptop') {
      this.showMessage('The item "Laptop" cannot be deleted (protected by server)', 'error');
      return;
    }

    const confirmed = confirm(`Are you sure you want to delete "${this.item.item_name}"?`);
    if (!confirmed) return;

    this.isLoading = true;
    this.inventoryService.deleteItem(this.item.item_name).subscribe({
      next: () => {
        this.showMessage('Item deleted successfully!', 'success');
        this.isLoading = false;
        // Go back after delete
        setTimeout(() => this.goBack(), 1500);
      },
      error: (error) => {
        this.showMessage(error.message || 'Failed to delete item', 'error');
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 5000);
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
}

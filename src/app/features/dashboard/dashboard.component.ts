import { Component, type OnInit } from "@angular/core"
import type { WebsocketService } from "../../../../core/services/websocket.service"

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <app-page-header title="Dashboard" subtitle="Overview of your restaurant"></app-page-header>

      <div class="stats-cards">
        <app-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon orders">
              <i class="material-icons">receipt</i>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stats.totalOrders }}</div>
              <div class="stat-label">Total Orders</div>
              <div class="stat-change" [ngClass]="{'positive': stats.orderChange > 0, 'negative': stats.orderChange < 0}">
                <i class="material-icons">{{ stats.orderChange > 0 ? 'arrow_upward' : 'arrow_downward' }}</i>
                <span>{{ stats.orderChange }}% from yesterday</span>
              </div>
            </div>
          </div>
        </app-card>

        <app-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon revenue">
              <i class="material-icons">attach_money</i>
            </div>
            <div class="stat-details">
              <div class="stat-value">\${{ stats.totalRevenue.toFixed(2) }}</div>
              <div class="stat-label">Total Revenue</div>
              <div class="stat-change" [ngClass]="{'positive': stats.revenueChange > 0, 'negative': stats.revenueChange < 0}">
                <i class="material-icons">{{ stats.revenueChange > 0 ? 'arrow_upward' : 'arrow_downward' }}</i>
                <span>{{ stats.revenueChange }}% from yesterday</span>
              </div>
            </div>
          </div>
        </app-card>

        <app-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon customers">
              <i class="material-icons">people</i>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stats.totalCustomers }}</div>
              <div class="stat-label">Total Customers</div>
              <div class="stat-change" [ngClass]="{'positive': stats.customerChange > 0, 'negative': stats.customerChange < 0}">
                <i class="material-icons">{{ stats.customerChange > 0 ? 'arrow_upward' : 'arrow_downward' }}</i>
                <span>{{ stats.customerChange }}% from yesterday</span>
              </div>
            </div>
          </div>
        </app-card>

        <app-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon tables">
              <i class="material-icons">table_chart</i>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stats.availableTables }}/{{ stats.totalTables }}</div>
              <div class="stat-label">Available Tables</div>
              <div class="stat-change neutral">
                <span>{{ stats.tableUtilization }}% utilization</span>
              </div>
            </div>
          </div>
        </app-card>
      </div>

      <div class="dashboard-row">
        <app-card class="chart-card">
          <div class="card-header">
            <h3 class="card-title">Revenue Overview</h3>
            <div class="card-actions">
              <button class="card-action-btn">
                <i class="material-icons">more_vert</i>
              </button>
            </div>
          </div>
          <div class="card-content">
            <div class="chart-container">
              <!-- Revenue chart will be rendered here -->
              <div class="chart-placeholder">
                <div class="chart-bars">
                  <div *ngFor="let value of revenueData" class="chart-bar" [style.height.%]="value / maxRevenue * 100"></div>
                </div>
                <div class="chart-labels">
                  <div *ngFor="let label of weekDays" class="chart-label">{{ label }}</div>
                </div>
              </div>
            </div>
          </div>
        </app-card>

        <app-card class="orders-card">
          <div class="card-header">
            <h3 class="card-title">Recent Orders</h3>
            <div class="card-actions">
              <a routerLink="/orders" class="view-all">View All</a>
            </div>
          </div>
          <div class="card-content">
            <div class="orders-list">
              <div *ngFor="let order of recentOrders" class="order-item">
                <div class="order-info">
                  <div class="order-id">#{{ order.id }}</div>
                  <div class="order-details">
                    <div class="order-customer">{{ order.customer }}</div>
                    <div class="order-time">{{ order.time | date:'shortTime' }}</div>
                  </div>
                </div>
                <div class="order-status" [ngClass]="'status-' + order.status">
                  {{ order.status }}
                </div>
                <div class="order-amount\">${{ order.amount.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </app-card>
      </div>

      <div class="dashboard-row">
        <app-card class="tables-card">
          <div class="card-header">
            <h3 class="card-title">Table Status</h3>
            <div class="card-actions">
              <a routerLink="/tables" class="view-all">View All</a>
            </div>
          </div>
          <div class="card-content">
            <div class="tables-grid">
              <div *ngFor="let table of tables" class="table-item" [ngClass]="'table-' + table.status">
                <div class="table-number">{{ table.number }}</div>
                <div class="table-capacity">
                  <i class="material-icons">person</i>
                  <span>{{ table.capacity }}</span>
                </div>
                <div class="table-status">{{ table.status }}</div>
                <div *ngIf="table.status === 'occupied'" class="table-time">{{ table.time }} min</div>
              </div>
            </div>
          </div>
        </app-card>

        <app-card class="popular-card">
          <div class="card-header">
            <h3 class="card-title">Popular Items</h3>
            <div class="card-actions">
              <button class="card-action-btn">
                <i class="material-icons">more_vert</i>
              </button>
            </div>
          </div>
          <div class="card-content">
            <div class="popular-items">
              <div *ngFor="let item of popularItems" class="popular-item">
                <div class="item-image">
                  <img [src]="item.image" [alt]="item.name">
                </div>
                <div class="item-details">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-category">{{ item.category }}</div>
                </div>
                <div class="item-orders">
                  <div class="item-order-count">{{ item.orders }}</div>
                  <div class="item-order-label">orders</div>
                </div>
              </div>
            </div>
          </div>
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }

    .dashboard-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .stat-card {
      height: 100%;
    }

    .stat-content {
      display: flex;
      align-items: center;
      padding: 16px;
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 8px;
      margin-right: 16px;
    }

    .stat-icon i {
      font-size: 28px;
      color: white;
    }

    .stat-icon.orders {
      background-color: #2196f3;
    }

    .stat-icon.revenue {
      background-color: #4caf50;
    }

    .stat-icon.customers {
      background-color: #ff9800;
    }

    .stat-icon.tables {
      background-color: #9c27b0;
    }

    .stat-details {
      flex: 1;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 14px;
      color: #757575;
      margin-bottom: 8px;
    }

    .stat-change {
      display: flex;
      align-items: center;
      font-size: 12px;
    }

    .stat-change i {
      font-size: 16px;
      margin-right: 4px;
    }

    .stat-change.positive {
      color: #4caf50;
    }

    .stat-change.negative {
      color: #f44336;
    }

    .stat-change.neutral {
      color: #757575;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
    }

    .card-actions {
      display: flex;
      align-items: center;
    }

    .card-action-btn {
      background: none;
      border: none;
      color: #757575;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-all {
      color: #2196f3;
      text-decoration: none;
      font-size: 14px;
    }

    .card-content {
      padding: 16px;
    }

    .chart-container {
      height: 300px;
      position: relative;
    }

    .chart-placeholder {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 16px;
      padding-bottom: 24px;
    }

    .chart-bar {
      flex: 1;
      background-color: #2196f3;
      border-radius: 4px 4px 0 0;
      min-height: 4px;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
    }

    .chart-label {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #757575;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .order-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 4px;
      background-color: #f9f9f9;
    }

    .order-info {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .order-id {
      font-weight: 600;
      margin-right: 12px;
    }

    .order-details {
      display: flex;
      flex-direction: column;
    }

    .order-customer {
      font-size: 14px;
    }

    .order-time {
      font-size: 12px;
      color: #757575;
    }

    .order-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      margin-right: 12px;
    }

    .status-pending {
      background-color: #fff8e1;
      color: #ff9800;
    }

    .status-preparing {
      background-color: #e3f2fd;
      color: #2196f3;
    }

    .status-ready {
      background-color: #e8f5e9;
      color: #4caf50;
    }

    .status-delivered {
      background-color: #f5f5f5;
      color: #757575;
    }

    .order-amount {
      font-weight: 600;
    }

    .tables-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .table-item {
      padding: 16px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .table-available {
      background-color: #e8f5e9;
    }

    .table-occupied {
      background-color: #ffebee;
    }

    .table-reserved {
      background-color: #e3f2fd;
    }

    .table-number {
      font-size: 18px;
      font-weight: 600;
    }

    .table-capacity {
      display: flex;
      align-items: center;
      font-size: 14px;
    }

    .table-capacity i {
      font-size: 16px;
      margin-right: 4px;
    }

    .table-status {
      font-size: 14px;
      font-weight: 500;
    }

    .table-time {
      font-size: 12px;
    }

    .popular-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .popular-item {
      display: flex;
      align-items: center;
    }

    .item-image {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 12px;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
    }

    .item-name {
      font-size: 14px;
      font-weight: 500;
    }

    .item-category {
      font-size: 12px;
      color: #757575;
    }

    .item-orders {
      text-align: right;
    }

    .item-order-count {
      font-size: 16px;
      font-weight: 600;
    }

    .item-order-label {
      font-size: 12px;
      color: #757575;
    }

    @media (min-width: 768px) {
      .stats-cards {
        grid-template-columns: repeat(2, 1fr);
      }

      .dashboard-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1200px) {
      .stats-cards {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    totalOrders: 0,
    orderChange: 0,
    totalRevenue: 0,
    revenueChange: 0,
    totalCustomers: 0,
    customerChange: 0,
    availableTables: 0,
    totalTables: 0,
    tableUtilization: 0,
  }

  recentOrders = []
  tables = []
  popularItems = []

  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  revenueData = [0, 0, 0, 0, 0, 0, 0]
  maxRevenue = 1000

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Load dashboard data
    this.loadDashboardData()

    // Subscribe to WebSocket for real-time updates
    this.websocketService.message$.subscribe((message) => {
      if (message) {
        this.handleRealtimeUpdate(message)
      }
    })
  }

  loadDashboardData(): void {
    // This would normally be an API call
    // For demo purposes, we'll use mock data

    // Stats
    this.stats = {
      totalOrders: 156,
      orderChange: 12,
      totalRevenue: 3245.75,
      revenueChange: 8,
      totalCustomers: 98,
      customerChange: 5,
      availableTables: 12,
      totalTables: 20,
      tableUtilization: 40,
    }

    // Revenue data
    this.revenueData = [650, 730, 540, 820, 950, 1100, 980]
    this.maxRevenue = Math.max(...this.revenueData)

    // Recent orders
    this.recentOrders = [
      { id: 1023, customer: "John Doe", time: new Date(), status: "ready", amount: 42.5 },
      { id: 1022, customer: "Jane Smith", time: new Date(Date.now() - 15 * 60000), status: "preparing", amount: 28.75 },
      {
        id: 1021,
        customer: "Robert Johnson",
        time: new Date(Date.now() - 30 * 60000),
        status: "delivered",
        amount: 35.2,
      },
      { id: 1020, customer: "Emily Davis", time: new Date(Date.now() - 45 * 60000), status: "pending", amount: 19.95 },
    ]

    // Tables
    this.tables = [
      { number: 1, capacity: 4, status: "available" },
      { number: 2, capacity: 2, status: "occupied", time: 25 },
      { number: 3, capacity: 6, status: "reserved" },
      { number: 4, capacity: 4, status: "occupied", time: 10 },
      { number: 5, capacity: 2, status: "available" },
      { number: 6, capacity: 8, status: "occupied", time: 45 },
    ]

    // Popular items
    this.popularItems = [
      { name: "Margherita Pizza", category: "Pizza", orders: 42, image: "assets/images/food/pizza.jpg" },
      { name: "Beef Burger", category: "Burgers", orders: 38, image: "assets/images/food/burger.jpg" },
      { name: "Caesar Salad", category: "Salads", orders: 30, image: "assets/images/food/salad.jpg" },
      { name: "Chocolate Cake", category: "Desserts", orders: 25, image: "assets/images/food/cake.jpg" },
    ]
  }

  handleRealtimeUpdate(message: any): void {
    // Handle different types of real-time updates
    switch (message.type) {
      case "new_order":
        this.stats.totalOrders++
        this.recentOrders.unshift({
          id: message.data.id,
          customer: message.data.customer,
          time: new Date(),
          status: "pending",
          amount: message.data.amount,
        })
        this.recentOrders = this.recentOrders.slice(0, 4)
        break

      case "table_update":
        const tableIndex = this.tables.findIndex((t) => t.number === message.data.number)
        if (tableIndex !== -1) {
          this.tables[tableIndex] = {
            ...this.tables[tableIndex],
            status: message.data.status,
            time: message.data.time,
          }

          // Update table stats
          this.updateTableStats()
        }
        break

      case "order_status_update":
        const orderIndex = this.recentOrders.findIndex((o) => o.id === message.data.id)
        if (orderIndex !== -1) {
          this.recentOrders[orderIndex].status = message.data.status
        }
        break
    }
  }

  updateTableStats(): void {
    const availableTables = this.tables.filter((t) => t.status === "available").length
    this.stats.availableTables = availableTables
    this.stats.tableUtilization = Math.round(
      ((this.stats.totalTables - availableTables) / this.stats.totalTables) * 100,
    )
  }
}

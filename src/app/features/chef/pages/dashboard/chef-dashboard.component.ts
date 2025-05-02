import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, DatePipe, NgClass } from '@angular/common';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  status?: string;
  timeRemaining?: number;
  ingredients?: Ingredient[];
}

interface Order {
  id: string;
  customer: string;
  time: Date;
  items: OrderItem[];
  table: {
    number: number;
    adults: number;
    children: number;
  };
  chef?: string;
  waiter?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-chef-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgClass, DatePipe],
  templateUrl: './chef-dashboard.component.html',
  styleUrls: ['./chef-dashboard.component.css'],
})
export class ChefDashboardComponent implements OnInit {
  activeTab = 'estado-pedidos';

  waitTime = {
    hours: '6',
    minutes: '52',
    seconds: '33',
  };

  pendingDishes = 8;
  completedDishes = 5;

  activeOrders: Order[] = [];
  selectedOrder: Order | null = null;
  selectedDish: OrderItem | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
    this.startTimer();

    if (this.activeOrders.length > 0) {
      this.selectedOrder = this.activeOrders[0];
      if (this.selectedOrder.items.length > 0) {
        this.selectedDish = this.selectedOrder.items[0];
      }
    }
  }

  loadOrders(): void {
    this.activeOrders = [
      {
        id: '01823',
        customer: 'Peter Kukurelo',
        time: new Date(),
        items: [
          {
            name: 'Arroz con Mariscos',
            quantity: 2,
            status: 'preparando',
            timeRemaining: 8,
            ingredients: [
              { name: 'Aceite vegetal', quantity: '1', unit: 'Cucharada' },
              { name: 'Cebolla roja', quantity: '1/2', unit: 'Unidad' },
              { name: 'Dientes de ajo', quantity: '1', unit: 'Unidad' },
              { name: 'Papa (LR)', quantity: '25', unit: 'Gramos' },
              { name: 'Mix de Mariscos', quantity: '150', unit: 'Gramos' },
              { name: 'Ají Ama M F no S', quantity: '25', unit: 'Gramos' },
              { name: 'Vino Blanco', quantity: '50', unit: 'ml.' },
              { name: 'Hoja de Laurel', quantity: '1/2', unit: 'Unidad' },
              { name: 'Arroz cocido', quantity: '1', unit: 'Taza' },
              { name: 'Culantro picado', quantity: '1/2', unit: 'Cucharada' },
              { name: 'Sal', quantity: '1/2', unit: 'Pizca' },
              { name: 'Pimienta Negra', quantity: '1/2', unit: 'Pizca' },
            ],
          },
          {
            name: 'Leche de Tigre',
            quantity: 1,
            status: 'listo',
            ingredients: [
              { name: 'Jugo de limón', quantity: '100', unit: 'ml' },
              { name: 'Pescado blanco', quantity: '50', unit: 'Gramos' },
              { name: 'Apio', quantity: '1', unit: 'Rama' },
              { name: 'Cilantro', quantity: '2', unit: 'Ramas' },
              { name: 'Ají limo', quantity: '1/2', unit: 'Unidad' },
              { name: 'Sal', quantity: '1', unit: 'Pizca' },
            ],
          },
          {
            name: 'Combo marino Jr.',
            quantity: 1,
            status: 'pendiente',
            timeRemaining: 2,
          },
          {
            name: 'Limonada Frozen',
            quantity: 1,
            status: 'pendiente',
            timeRemaining: 1,
          },
        ],
        table: { number: 4, adults: 3, children: 1 },
        chef: 'Brisa Veliz',
        waiter: 'Miguel Diaz',
      },
      {
        id: '01825',
        customer: 'Raul Curi',
        time: new Date(Date.now() - 15 * 60000),
        items: [
          {
            name: 'Ceviche de Conchas Negras',
            quantity: 1,
            status: 'pendiente',
            timeRemaining: 12,
          },
        ],
        table: { number: 2, adults: 2, children: 0 },
        chef: 'Brisa Veliz',
        waiter: 'Carlos Mendoza',
      },
      {
        id: '01822',
        customer: 'Camila Campos',
        time: new Date(Date.now() - 30 * 60000),
        items: [
          {
            name: 'Mei Mei Frito',
            quantity: 1,
            status: 'listo',
          },
        ],
        table: { number: 5, adults: 2, children: 0 },
        chef: 'Brisa Veliz',
        waiter: 'Miguel Diaz',
      },
    ];
  }

  startTimer(): void {
    setInterval(() => {
      let seconds = Number.parseInt(this.waitTime.seconds);
      let minutes = Number.parseInt(this.waitTime.minutes);
      let hours = Number.parseInt(this.waitTime.hours);

      seconds++;

      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }

      this.waitTime.seconds = seconds.toString().padStart(2, '0');
      this.waitTime.minutes = minutes.toString().padStart(2, '0');
      this.waitTime.hours = hours.toString();
    }, 1000);
  }

  toggleOrderExpand(order: Order): void {
    this.activeOrders.forEach((o) => {
      o.expanded = o.id === order.id ? !o.expanded : false;
    });
  }

  getOrderProgress(order: Order): string {
    const completed = order.items.filter((item) => item.status === 'listo').length;
    return `${completed}/${order.items.length}`;
  }

  getItemStatusClass(item: OrderItem): string {
    switch (item.status) {
      case 'pendiente':
        return 'status-pending';
      case 'preparando':
        return 'status-preparing';
      case 'listo':
        return 'status-ready';
      default:
        return '';
    }
  }

  getItemStatusIcon(item: OrderItem): string {
    switch (item.status) {
      case 'pendiente':
        return 'hourglass_empty';
      case 'preparando':
        return 'cooking';
      case 'listo':
        return 'check_circle';
      default:
        return 'help';
    }
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.selectedDish = order.items.length > 0 ? order.items[0] : null;
  }

  selectDish(dish: OrderItem): void {
    this.selectedDish = dish;
  }
}

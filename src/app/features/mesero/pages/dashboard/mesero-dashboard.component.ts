import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule, NgIf, NgFor, NgClass, DatePipe } from '@angular/common';

@Component({
  selector: "app-mesero-dashboard",
  standalone: true,
  templateUrl: './mesero-dashboard.component.html',
  styleUrls: ['./mesero-dashboard.component.css'],
  imports: [CommonModule, NgIf, NgFor, NgClass, DatePipe]
})

export class MeseroDashboardComponent implements OnInit {
  activeTab = "atendidos";

  stats = {
    customers: 4,
    dishes: 8,
    tables: 7,
  };

  activeOrders: any[] = [];
  completedOrders: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.activeOrders = [
      {
        id: "01823",
        customer: "Peter Kukurelo",
        time: new Date(),
        status: "preparando",
        expanded: false,
        items: [
          { quantity: 2, name: "Arroz con Mariscos", status: "preparando", timeRemaining: 8 },
          { quantity: 1, name: "Leche de Tigre", status: "listo" },
          { quantity: 1, name: "Combo marino Jr.", status: "pendiente", timeRemaining: 2 },
          { quantity: 1, name: "Limonada Frozen", status: "pendiente", timeRemaining: 1 },
        ],
        table: {
          number: 4,
          adults: 3,
          children: 1,
        },
      },
      {
        id: "01822",
        customer: "Camila Campos",
        time: new Date(Date.now() - 15 * 60000),
        status: "entregado",
        expanded: false,
        items: [{ quantity: 1, name: "Mei Mei Frito" }],
        table: {
          number: 2,
          adults: 2,
          children: 0,
        },
      },
      {
        id: "01821",
        customer: "Valeria Hayatt",
        time: new Date(Date.now() - 30 * 60000),
        status: "pendiente",
        expanded: false,
        items: [
          { quantity: 1, name: "Ceviche Mixto" },
          { quantity: 2, name: "Chicharrón de Pescado" },
        ],
        table: {
          number: 5,
          adults: 2,
          children: 1,
        },
      },
    ];

    this.completedOrders = [
      { id: "01820", customer: "Jorge Ramírez", time: new Date(Date.now() - 60 * 60000), status: "entregado" },
      { id: "01819", customer: "María López", time: new Date(Date.now() - 90 * 60000), status: "entregado" },
      { id: "01818", customer: "Carlos Mendoza", time: new Date(Date.now() - 120 * 60000), status: "entregado" },
      { id: "01817", customer: "Ana Gutiérrez", time: new Date(Date.now() - 150 * 60000), status: "entregado" },
    ];
  }

  toggleOrderExpand(order: any) {
    order.expanded = !order.expanded;
  }

  getTimeRemaining(order: any): string {
    const maxTime = Math.max(
      ...order.items.filter((item: any) => item.timeRemaining).map((item: any) => item.timeRemaining || 0)
    );
    return maxTime.toString();
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case "pendiente":
        return "hourglass_empty";
      case "preparando":
        return "cooking";
      case "listo":
        return "check_circle";
      default:
        return "help";
    }
  }

  navigateToNewOrder() {
    this.router.navigate(["/mesero/nuevo-pedido"]);
  }
}

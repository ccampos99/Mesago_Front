import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() userRole = '';

  currentTime = '';
  showClock = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Órdenes', route: '/ordenes', roles: ['ADMIN', 'MESERO', 'CHEF'] },
    { label: 'Mesas', route: '/mesas', roles: ['ADMIN', 'MESERO'] },
    { label: 'Tiempos', route: '/tiempos', roles: ['ADMIN', 'CHEF'] },
    { label: 'Historial', route: '/historial', roles: ['ADMIN', 'CHEF'] },
    { label: 'Comunicación', route: '/comunicacion', roles: ['ADMIN', 'MESERO', 'CHEF'] }
  ];

  filteredMenuItems: MenuItem[] = [];

  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  ngOnInit() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userRole = user.roles[0];
      this.filterMenuItems();
      this.showClock = this.userRole === 'CHEF';
    }
  }

  filterMenuItems() {
    this.filteredMenuItems = this.menuItems.filter((item) => {
      if (!item.roles) return true;
      return item.roles.includes(this.userRole);
    });
  }

  updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;
  }
}

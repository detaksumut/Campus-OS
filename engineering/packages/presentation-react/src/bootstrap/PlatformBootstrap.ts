import React from 'react';
import { globalModuleRegistry } from '../framework';
import { ExecutiveDashboardLayout } from './layouts/ExecutiveDashboardLayout';
import { HeroWidget } from './widgets/HeroWidget';
import { QuickAccessWidget } from './widgets/QuickAccessWidget';
import { ExecutiveSummaryWidget } from './widgets/ExecutiveSummaryWidget';
import { ChartWidget, NotificationWidget, CalendarWidget, TaskWidget, CopilotWidget, AnnouncementWidget } from './widgets/SystemWidgets';
import { globalLayoutRegistry } from '../framework/registries/LayoutRegistry';

// Register Layout
globalLayoutRegistry.register({
  id: 'layout.dashboard.executive',
  component: ExecutiveDashboardLayout,
  regions: ['hero', 'quick-access', 'main.left', 'main.right', 'sidebar']
});

// Register Module Manifest
globalModuleRegistry.register({
  id: 'module.core.dashboard',
  name: 'Core Dashboard Module',
  navigation: [
    {
      id: 'nav.home',
      label: 'Campus OS',
      route: '/',
      moduleId: 'module.core.dashboard',
      workbenchId: 'executive-dashboard',
      children: [
        { id: 'nav.beranda', label: 'Beranda', route: '/home', moduleId: 'module.core.dashboard', workbenchId: 'executive-dashboard' }
      ]
    },
    {
      id: 'nav.akademik',
      label: 'Akademik',
      route: '/akademik',
      moduleId: 'module.academic',
      workbenchId: 'academic-dashboard',
      children: [
        { id: 'nav.pmb', label: 'PMB', route: '/pmb', moduleId: 'module.academic', workbenchId: 'academic-pmb' },
        { id: 'nav.siakad', label: 'Sistem Akademik', route: '/siakad', moduleId: 'module.academic', workbenchId: 'academic-siakad' }
      ]
    }
  ],
  workbenches: [
    {
      id: 'executive-dashboard',
      name: 'Executive Dashboard',
      defaultLayout: 'layout.dashboard.executive'
    }
  ],
  widgets: [
    { id: 'widget.hero', component: HeroWidget, defaultPlacement: 'hero' },
    { id: 'widget.quickaccess', component: QuickAccessWidget, defaultPlacement: 'quick-access' },
    { id: 'widget.executive.summary', component: ExecutiveSummaryWidget, defaultPlacement: 'main.left' },
    { id: 'widget.chart.line', component: ChartWidget, defaultPlacement: 'main.left' },
    { id: 'widget.chart.pie', component: ChartWidget, defaultPlacement: 'main.left' },
    { id: 'widget.notification', component: NotificationWidget, defaultPlacement: 'main.left' },
    { id: 'widget.calendar', component: CalendarWidget, defaultPlacement: 'sidebar' },
    { id: 'widget.task', component: TaskWidget, defaultPlacement: 'sidebar' },
    { id: 'widget.announcement', component: AnnouncementWidget, defaultPlacement: 'sidebar' },
    { id: 'widget.copilot', component: CopilotWidget, defaultPlacement: 'hero' }
  ]
});

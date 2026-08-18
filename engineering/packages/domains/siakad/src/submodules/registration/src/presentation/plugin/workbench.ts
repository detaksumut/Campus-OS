export const RegistrationWorkbench = {
  id: 'RegistrationWorkbench',
  layoutType: 'DashboardLayout',
  zones: {
    hero: {
      placements: [
        { widgetId: 'RegistrationHeroWidget', order: 1 }
      ]
    },
    kpi: {
      placements: [
        { widgetId: 'RegistrationKPIWidget', order: 1 }
      ]
    },
    main: {
      placements: [
        { widgetId: 'RegistrationQueueWidget', order: 1 },
        { widgetId: 'RecentRegistrationsWidget', order: 2 }
      ]
    },
    sidebar: {
      placements: [
        { widgetId: 'EligibilityStatusWidget', order: 1 },
        { widgetId: 'RegistrationCalendarWidget', order: 2 }
      ]
    }
  }
};

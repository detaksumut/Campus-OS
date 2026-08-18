import React from 'react';
import { WidgetHost } from '../../framework/hosts/WidgetHost';

export const ExecutiveDashboardLayout: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      
      {/* Hero Region */}
      <section className="relative">
        <WidgetHost id="widget.hero" />
        <div className="absolute top-4 right-4 z-10 w-80">
          <WidgetHost id="widget.copilot" />
        </div>
      </section>

      {/* Quick Access Region */}
      <section>
        <div className="font-bold text-slate-700 mb-3 text-lg">Akses Cepat</div>
        <WidgetHost id="widget.quickaccess" />
      </section>

      {/* Main Grid */}
      <div className="flex gap-6 items-start">
        
        {/* Left/Main Column */}
        <div className="flex-1 space-y-6">
          <section>
            <div className="font-bold text-slate-700 mb-3 text-lg">Ringkasan Eksekutif</div>
            <WidgetHost id="widget.executive.summary" />
          </section>
          
          <section className="grid grid-cols-2 gap-6">
            <WidgetHost id="widget.chart.line" />
            <WidgetHost id="widget.chart.pie" />
          </section>

          <section>
             <WidgetHost id="widget.notification" />
          </section>
        </div>

        {/* Right Sidebar Column */}
        <div className="w-80 space-y-6">
          <WidgetHost id="widget.calendar" />
          <WidgetHost id="widget.task" />
          <WidgetHost id="widget.announcement" />
        </div>

      </div>

    </div>
  );
};

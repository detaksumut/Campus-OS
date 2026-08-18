import React from 'react';
import { WidgetHost } from './WidgetHost';

interface ZoneRendererProps {
  zoneId: string;
  zoneConfig: any;
}

export const ZoneRenderer: React.FC<ZoneRendererProps> = ({ zoneId, zoneConfig }) => {
  if (!zoneConfig || !zoneConfig.placements) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {zoneConfig.placements.map((placement: any) => (
        <WidgetHost key={placement.widgetId} widgetId={placement.widgetId} />
      ))}
    </div>
  );
};

import React from 'react';
import { Icon, Tooltip } from 'antd';

export const TooltipInput = () => 
  <Tooltip title="Обязательное поле">
    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
  </Tooltip>;

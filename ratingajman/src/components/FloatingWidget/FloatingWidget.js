import React from "react";
import { FloatingAction } from "react-native-floating-action";

export const FloatingWidget = ({ 
  actions,
  handleItemSelection,
}) => (
  <FloatingAction
    actions={actions}
    onPressItem={handleItemSelection}
  />
)
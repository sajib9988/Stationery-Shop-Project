import React from "react";

export const Sidebar = ({ children, className, collapsible }) => (
  <div className={`sidebar ${className}`} data-collapsible={collapsible}>
    {children}
  </div>
);

export const SidebarProvider = ({ children }) => (
  <div className="sidebar-provider">
    {children}
  </div>
);

export const SidebarHeader = ({ children, className }) => (
  <div className={`sidebar-header ${className}`}>
    {children}
  </div>
);

export const SidebarContent = ({ children }) => (
  <div className="sidebar-content">
    {children}
  </div>
);

export const SidebarMenu = ({ children }) => (
  <ul className="sidebar-menu">
    {children}
  </ul>
);

export const SidebarMenuItem = ({ children }) => (
  <li className="sidebar-menu-item">
    {children}
  </li>
);

export const SidebarMenuButton = ({ children, asChild, isActive, className }) => (
  <button className={`sidebar-menu-button ${isActive ? 'active' : ''} ${className}`}>
    {asChild ? children : <span>{children}</span>}
  </button>
); 
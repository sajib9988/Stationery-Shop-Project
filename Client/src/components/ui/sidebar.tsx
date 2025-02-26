import React from 'react';


interface SidebarProps {
  children: React.ReactNode; // Accepts any valid React node
  className?: string; // Optional string for additional CSS classes
  collapsible?: boolean; // Optional boolean to indicate if the sidebar is collapsible
}
export const Sidebar: React.FC<SidebarProps> = ({ children, className = '', collapsible }) => (
  <div className={`sidebar ${className}`} data-collapsible={collapsible}>
    {children}
  </div>
);
export const SidebarProvider = ({ children }:{children:React.ReactNode}) => (
  <div className="sidebar-provider">
    {children}
  </div>
);

export const SidebarHeader:React.FC<SidebarProps> = ({ children, className }) => (
  <div className={`sidebar-header ${className}`}>
    {children}
  </div>
);

export const SidebarContent:React.FC<SidebarProps> = ({ children }) => (
  <div className="sidebar-content">
    {children}
  </div>
);

export const SidebarMenu:React.FC<SidebarProps> = ({ children }) => (
  <ul className="sidebar-menu">
    {children}
  </ul>
);

export const SidebarMenuItem:React.FC<SidebarProps> = ({ children }) => (
  <li className="sidebar-menu-item">
    {children}
  </li>
);

interface SidebarMenuButtonProps {
  children: React.ReactNode; // Accepts any valid React node
  asChild?: boolean; // Optional boolean to determine if the button should render its children as the button itself
  isActive?: boolean; // Optional boolean to indicate if the button is active
  className?: string; // Optional string for additional CSS classes
}

export const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({
  children,
  asChild = false,
  isActive = false,
  className = '',
}) => (
  <button className={`sidebar-menu-button ${isActive ? 'active' : ''} ${className}`}>
    {asChild ? children : <span>{children}</span>}
  </button>
);
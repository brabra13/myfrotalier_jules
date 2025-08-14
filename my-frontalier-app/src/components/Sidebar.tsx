'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Cabinet', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/fiscalite', label: 'Fiscalité', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
    { href: '/social', label: 'Social', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/documents', label: 'Dépôt de Documents', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { href: '/actualites', label: 'Actualités', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2M5 10h2a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1a1 1 0 011-1z' },
    { href: '/faq', label: 'FAQ', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 1.976-1.724 3.5-3.772 3.5-1.742 0-3.223-.835-3.772-2M12 18.5v.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z' },
  ];

  return (
    <aside className="sidebar-container w-72 flex-shrink-0 bg-background relative">
      <div className="flex h-full flex-col relative z-10">
        <div className="p-8 border-b border-border-light bg-gradient-to-r from-background to-background-secondary">
          <h1 className="font-display text-2xl font-semibold text-text-primary mb-1 transition-colors duration-300">MyFrontaliers</h1>
          <p className="text-sm text-text-muted font-medium">Cabinet Expert Comptable</p>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-secondary rounded-full"></div>
        </div>
        <nav className="flex-1 p-6 bg-background">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} legacyBehavior>
                <a className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                  </svg>
                  <span>{item.label}</span>
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

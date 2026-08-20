'use client';

import { useState, useEffect } from 'react';

export type Role = 'admin' | 'staff';

export function useAuth() {
  const [role, setRole] = useState<Role>('admin');

  useEffect(() => {
    const savedRole = localStorage.getItem('user_role') as Role;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const switchRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('user_role', newRole);
  };

  return { role, switchRole };
}
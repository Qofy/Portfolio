import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  count?: string;
}

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface HeroContent {
  name: string;
  title: string;
  bio: string;
  ctaText: string;
}

import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const baseProps = {
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const IconFactory = (paths: (props: IconProps) => JSX.Element) =>
  function Icon(props: IconProps) {
    return (
      <svg aria-hidden focusable={false} {...baseProps} {...props}>
        {paths(props)}
      </svg>
    );
  };

export const CalendarIcon = IconFactory(() => (
  <>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M4 9h16" />
  </>
));

export const FileIcon = IconFactory(() => (
  <>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
  </>
));

export const MegaphoneIcon = IconFactory(() => (
  <>
    <path d="m4 11 10-5v12L4 13v6" />
    <path d="M20 8v8" />
  </>
));

export const UsersIcon = IconFactory(() => (
  <>
    <circle cx="9" cy="7" r="4" />
    <path d="M17 11a4 4 0 1 0-4-4" />
    <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
    <path d="M17 21v-2a6 6 0 0 0-3-5" />
  </>
));

export const NotificationIcon = IconFactory(() => (
  <>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </>
));

export const SparkleIcon = IconFactory(() => (
  <>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="m19.778 8.222-3.536 3.536" />
    <path d="m7.758 16.242-3.536 3.536" />
    <path d="m19.778 19.778-3.536-3.536" />
    <path d="m7.758 7.758-3.536-3.536" />
    <circle cx="12" cy="12" r="3" />
  </>
));

export const HomeIcon = IconFactory(() => (
  <>
    <path d="m3 11 9-8 9 8" />
    <path d="M4 10v10h16V10" />
    <path d="M9 21V13h6v8" />
  </>
));

export const MessageIcon = IconFactory(() => (
  <>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8.5Z" />
  </>
));

export const TicketIcon = IconFactory(() => (
  <>
    <path d="M3 9a2 2 0 0 1 2-2h5l2-2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-2-2H5a2 2 0 0 1-2-2z" />
    <path d="M13 5v14" />
    <path d="M7 9h4" />
    <path d="M7 15h4" />
  </>
));

export const ProfileIcon = IconFactory(() => (
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
  </>
));

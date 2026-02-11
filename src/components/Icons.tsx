export function SpeedIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 36C6 22.745 16.745 12 30 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 36L34 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="36" r="3" fill="currentColor" />
      <path d="M12 36h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M42 36c0-2.5-.5-5-1.5-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ValueIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 14v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 18h6c2.2 0 4 1.8 4 4s-1.8 4-4 4h-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 26h7c2.2 0 4 1.8 4 4s-1.8 4-4 4h-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 18h-2M20 34h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ControlIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="18" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20h7M21 20h19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 30h19M33 30h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ExcellenceIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6l5.5 11.5L42 19l-9 8.5L35 40 24 34l-11 6 2-12.5L6 19l12.5-1.5L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 14l3 6.5 7 1-5 5 1.5 7-6.5-3.5-6.5 3.5 1.5-7-5-5 7-1 3-6.5z" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function ProfessionalIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="18" width="36" height="22" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 18V14a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="29" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M24 33v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WorldIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="2" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="2" />
      <path d="M9 15h30M9 33h30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function ShieldIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L8 12v12c0 11 16 18 16 18s16-7 16-18V12L24 4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DreamIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34l6-8 5 4 8-12 7 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function AIIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 16h-2M38 16h-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 22v6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 28h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 28v10l4-3 4 3V28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M26 28v10l4-3 4 3V28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="22" cy="15" r="1.5" fill="currentColor" />
      <circle cx="26" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function RefineIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="32" height="36" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 14h20M14 22h14M14 30h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" fill="white" />
      <path d="M35 32l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8c-3 5-4 10-3 15s4 10 8 14l5-3c1-.6 2.2-.4 3 .3l5 4c1 .8 1.2 2.3.3 3.2l-3 3c-1 1-2.5 1.3-3.8.8C17 42 8 33 5 24.5c-.5-1.3-.2-2.8.8-3.8l3-3c1-.9 2.4-.7 3.2.3l4 5c.7.8.9 2 .3 3l-2.3 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 8a12 12 0 0112 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 14a6 6 0 016 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function EthicalIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 42c-4-3-16-12-16-22a10 10 0 0116-8 10 10 0 0116 8c0 10-12 19-16 22z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 16l14 8-14 8V16z" fill="currentColor" />
    </svg>
  );
}

export function PlaneIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 6L6 22l14 4 4 14L42 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M42 6L20 26" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 26v8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 15l18 11 18-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4v16M5 13l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 44s16-12 16-24a16 16 0 10-32 0c0 12 16 24 16 24z" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

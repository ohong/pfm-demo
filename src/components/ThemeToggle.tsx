interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 4.343L17.071 2.929M2.929 17.071L4.343 15.657M15.657 15.657L17.071 17.071M2.929 2.929L4.343 4.343M14 10C14 12.209 12.209 14 10 14C7.791 14 6 12.209 6 10C6 7.791 7.791 6 10 6C12.209 6 14 7.791 14 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293C16.235 13.748 15.064 14 13.833 14C9.231 14 5.5 10.269 5.5 5.667C5.5 4.436 5.752 3.265 6.207 2.207C3.316 3.596 1.25 6.548 1.25 10C1.25 14.556 4.944 18.25 9.5 18.25C12.952 18.25 15.904 16.184 17.293 13.293Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

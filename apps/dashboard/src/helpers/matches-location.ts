export function matchesLocation(path: string): boolean {
  return path === '/'
    ? location.pathname === '/'
    : location.pathname.includes(path);
}

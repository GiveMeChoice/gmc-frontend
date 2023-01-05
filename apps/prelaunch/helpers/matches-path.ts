export function matchesPath(path: string, pathname: string): boolean {
  return path === '/' ? pathname === '/' : pathname.includes(path);
}

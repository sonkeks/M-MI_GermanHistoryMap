export function capitalizeFirst(string?: string): string {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

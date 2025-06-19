export function getSeededColor(index: number, totalColors = 20): string {
  // totalColors defines how many unique colors you want to cycle through before repeating
  
  const hueStep = 360 / totalColors;  // Spread hues evenly around the circle
  const hue = ((index - 1) * hueStep) % 360; // Wrap around 360 degrees
  
  const saturation = 40; // Keep saturation constant (percent)
  const lightness = 50;  // Keep lightness constant (percent)
  
  // Return HSL string — great for CSS
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

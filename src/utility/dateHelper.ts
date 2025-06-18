export function getDateFormat(startDate?: string, endDate?: string): string {
  const parsedStartDate = parseDate(startDate);
  const parsedEndDate = parseDate(endDate);
  if ((parsedStartDate && parsedEndDate) && (parsedStartDate.toLocaleDateString() !== parsedEndDate.toLocaleDateString())) {
    return `${parsedStartDate.toLocaleDateString()} - ${parsedEndDate.toLocaleDateString()}`;
  }
  if (parsedStartDate) {
    return parsedStartDate.toLocaleDateString();
  }
  if (parsedEndDate) {
    return parsedEndDate.toLocaleDateString();
  }
  return "Unknown";
}

export function parseDate(date?: string): Date | undefined {
  if (date && !isNaN(Date.parse(date))) {
    return new Date(date);
  }
  return undefined;
}

export function getSortableDate(startDate?: string, endDate?: string): Date | undefined {
  if (startDate && !isNaN(Date.parse(startDate))) {
    return new Date(startDate);
  }
  if (endDate && !isNaN(Date.parse(endDate))) {
    return new Date(endDate);
  }
  return undefined;
}

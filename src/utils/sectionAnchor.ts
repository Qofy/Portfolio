export function getSectionAnchor(section: HTMLElement) {
  const parent = section.parentElement;
  return parent?.classList.contains('pin-spacer') ? parent : section;
}

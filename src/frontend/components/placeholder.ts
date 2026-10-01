export function createPlaceholderView(title: string, description: string): HTMLElement {
  const section = document.createElement('section');
  section.className = 'view-placeholder';

  const heading = document.createElement('h1');
  heading.textContent = title;

  const paragraph = document.createElement('p');
  paragraph.textContent = description;

  section.appendChild(heading);
  section.appendChild(paragraph);
  return section;
}

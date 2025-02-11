export function markdownToHtml(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/(\d+\. .*?)(?=\n|$)/g, '<div class="choice-item">$1</div>')
    .replace(/(<div class="choice-item">.*<\/div>)+/g, '<div class="choice-list">$&</div>')
    .replace(/\n/g, '<br>')
}
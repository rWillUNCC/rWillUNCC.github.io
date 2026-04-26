let input = document.getElementById('markdown-input');
let output = document.getElementById('html-output');
let preview = document.getElementById('preview');

function convertMarkdown() {
  let str = input.value;

  str = str.replace(/^\s*# (.*$)/gm, '<h1>$1</h1>');
  str = str.replace(/^\s*## (.*$)/gm, '<h2>$1</h2>');
  str = str.replace(/^\s*### (.*$)/gm, '<h3>$1</h3>');
  
  str = str.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');
  str = str.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

  str = str.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');
  str = str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  str = str.replace(/^\s*> (.*$)/gm, '<blockquote>$1</blockquote>');
  

  return str.replace(/\n/g, '');
}

input.addEventListener('input', () => {
  const html = convertMarkdown();
  output.textContent = html; 
  preview.innerHTML = html;
});
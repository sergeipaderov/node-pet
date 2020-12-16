document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  }).format(node.textContent)
})
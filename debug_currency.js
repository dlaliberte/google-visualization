// Simple test to debug currency formatting
console.log('Testing currency formatting...');

// Mock the required modules for testing
const mockNumberFormat = {
  formatValue: function(value) {
    const prefix = '$';
    const negativeParens = true;

    if (value < 0 && negativeParens) {
      const absValue = Math.abs(value);
      const formatted = absValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return '(' + prefix + formatted + ')';
    } else {
      const formatted = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return prefix + formatted;
    }
  }
};

console.log('Positive:', mockNumberFormat.formatValue(1234.56));
console.log('Negative:', mockNumberFormat.formatValue(-1234.56));
console.log('Expected negative: $(1,234.56)');

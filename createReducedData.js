const fs = require('fs');

console.log('🔧 Creating Reduced Mock Data');
console.log('=============================');

// Read the backup dataset
console.log('📖 Reading backup dataset...');
const mockData = require('./data/mockData.backup.js');
const allRecords = Object.keys(mockData).length;
console.log(`Backup records: ${allRecords.toLocaleString()}`);

// Target: 100,000 records (should be ~25MB)
const targetRecords = 100000;
console.log(`Target records: ${targetRecords.toLocaleString()}`);

// Convert to array and randomly select records
const allEntries = Object.entries(mockData);

// Fisher-Yates shuffle
for (let i = allEntries.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allEntries[i], allEntries[j]] = [allEntries[j], allEntries[i]];
}

// Take first N records
const selectedEntries = allEntries.slice(0, targetRecords);

// Convert back to object
const reducedData = {};
selectedEntries.forEach(([key, value]) => {
  reducedData[key] = value;
});

console.log('💾 Writing reduced dataset...');

// Write the reduced dataset with compact formatting
const reducedContent = `const mockData = ${JSON.stringify(reducedData, null, 0)};\n\nmodule.exports = mockData;`;

fs.writeFileSync('./data/mockData.js', reducedContent);

// Calculate file size
const newSize = fs.statSync('./data/mockData.js').size;
const sizeMB = (newSize / 1024 / 1024).toFixed(2);

console.log('\n🎉 Reduction Complete!');
console.log('====================');
console.log(`New file size: ${sizeMB} MB`);
console.log(`Records: ${Object.keys(reducedData).length.toLocaleString()}`);
console.log(`GitHub compatible: ${sizeMB < 100 ? '✅ Yes' : '❌ No'}`);

// Show some quick stats
const records = Object.values(reducedData);
const males = records.filter(r => r.gender === 'Male').length;
const females = records.filter(r => r.gender === 'Female').length;

console.log(`Gender: ${males.toLocaleString()} Male (${(males/targetRecords*100).toFixed(1)}%), ${females.toLocaleString()} Female (${(females/targetRecords*100).toFixed(1)}%)`);

console.log('\n✅ Ready for Git commit!');

const mockData = require('./data/mockData.js');

class AadhaarDataUtils {
  constructor() {
    this.data = mockData;
    this.totalRecords = Object.keys(this.data).length;
  }

  // Get basic statistics about the dataset
  getStats() {
    const records = Object.values(this.data);
    const males = records.filter(r => r.gender === 'Male').length;
    const females = records.filter(r => r.gender === 'Female').length;
    
    const states = {};
    const cities = {};
    const ages = records.map(r => r.age);
    
    records.forEach(record => {
      const state = record.address.state;
      const city = record.address.city;
      
      states[state] = (states[state] || 0) + 1;
      cities[city] = (cities[city] || 0) + 1;
    });

    const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length;
    
    // Handle large arrays without spreading
    let minAge = ages[0];
    let maxAge = ages[0];
    
    for (const age of ages) {
      if (age < minAge) minAge = age;
      if (age > maxAge) maxAge = age;
    }

    return {
      totalRecords: this.totalRecords,
      gender: {
        male: males,
        female: females,
        malePercentage: ((males / this.totalRecords) * 100).toFixed(2),
        femalePercentage: ((females / this.totalRecords) * 100).toFixed(2)
      },
      age: {
        average: Math.round(avgAge),
        minimum: minAge,
        maximum: maxAge
      },
      topStates: Object.entries(states)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([state, count]) => ({ state, count, percentage: ((count/this.totalRecords)*100).toFixed(2) })),
      topCities: Object.entries(cities)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15)
        .map(([city, count]) => ({ city, count, percentage: ((count/this.totalRecords)*100).toFixed(2) }))
    };
  }

  // Search for records by criteria
  search(criteria) {
    const results = [];
    const records = Object.entries(this.data);
    
    for (const [aadhaar, record] of records) {
      let matches = true;
      
      if (criteria.name && !record.name.toLowerCase().includes(criteria.name.toLowerCase())) {
        matches = false;
      }
      
      if (criteria.gender && record.gender !== criteria.gender) {
        matches = false;
      }
      
      if (criteria.state && record.address.state !== criteria.state) {
        matches = false;
      }
      
      if (criteria.city && record.address.city !== criteria.city) {
        matches = false;
      }
      
      if (criteria.minAge && record.age < criteria.minAge) {
        matches = false;
      }
      
      if (criteria.maxAge && record.age > criteria.maxAge) {
        matches = false;
      }
      
      if (matches) {
        results.push({ aadhaar, ...record });
        
        // Limit results to prevent memory issues
        if (results.length >= (criteria.limit || 100)) {
          break;
        }
      }
    }
    
    return results;
  }

  // Get random records
  getRandomRecords(count = 10) {
    const allKeys = Object.keys(this.data);
    const randomRecords = [];
    
    for (let i = 0; i < count && i < allKeys.length; i++) {
      const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
      randomRecords.push({
        aadhaar: randomKey,
        ...this.data[randomKey]
      });
    }
    
    return randomRecords;
  }

  // Validate if an Aadhaar number exists
  exists(aadhaarNumber) {
    return aadhaarNumber in this.data;
  }

  // Get record by Aadhaar number
  get(aadhaarNumber) {
    return this.data[aadhaarNumber] || null;
  }

  // Get all available states
  getStates() {
    const states = new Set();
    Object.values(this.data).forEach(record => {
      states.add(record.address.state);
    });
    return Array.from(states).sort();
  }

  // Get all available cities
  getCities() {
    const cities = new Set();
    Object.values(this.data).forEach(record => {
      cities.add(record.address.city);
    });
    return Array.from(cities).sort();
  }
}

// CLI functionality
if (require.main === module) {
  const utils = new AadhaarDataUtils();
  const command = process.argv[2];

  switch (command) {
    case 'stats':
      console.log('📊 Dataset Statistics');
      console.log('====================');
      const stats = utils.getStats();
      console.log(`Total Records: ${stats.totalRecords.toLocaleString()}`);
      console.log(`\nGender Distribution:`);
      console.log(`  Male: ${stats.gender.male.toLocaleString()} (${stats.gender.malePercentage}%)`);
      console.log(`  Female: ${stats.gender.female.toLocaleString()} (${stats.gender.femalePercentage}%)`);
      console.log(`\nAge Distribution:`);
      console.log(`  Average: ${stats.age.average} years`);
      console.log(`  Range: ${stats.age.minimum} - ${stats.age.maximum} years`);
      console.log(`\nTop 10 States:`);
      stats.topStates.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.state}: ${item.count.toLocaleString()} (${item.percentage}%)`);
      });
      console.log(`\nTop 15 Cities:`);
      stats.topCities.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.city}: ${item.count.toLocaleString()} (${item.percentage}%)`);
      });
      break;

    case 'random':
      const count = parseInt(process.argv[3]) || 5;
      console.log(`🎲 ${count} Random Records`);
      console.log('==================');
      const randomRecords = utils.getRandomRecords(count);
      randomRecords.forEach((record, index) => {
        console.log(`${index + 1}. Aadhaar: ${record.aadhaar}`);
        console.log(`   Name: ${record.name}`);
        console.log(`   Age: ${record.age}, Gender: ${record.gender}`);
        console.log(`   Location: ${record.address.city}, ${record.address.state}`);
        console.log('');
      });
      break;

    case 'search':
      const searchTerm = process.argv[3];
      if (!searchTerm) {
        console.log('Usage: node dataUtils.js search <name>');
        break;
      }
      console.log(`🔍 Searching for: "${searchTerm}"`);
      console.log('========================');
      const searchResults = utils.search({ name: searchTerm, limit: 10 });
      if (searchResults.length === 0) {
        console.log('No results found.');
      } else {
        console.log(`Found ${searchResults.length} results:`);
        searchResults.forEach((record, index) => {
          console.log(`${index + 1}. ${record.name} (${record.aadhaar})`);
          console.log(`   Age: ${record.age}, Gender: ${record.gender}`);
          console.log(`   Location: ${record.address.city}, ${record.address.state}`);
          console.log('');
        });
      }
      break;

    case 'lookup':
      const aadhaar = process.argv[3];
      if (!aadhaar) {
        console.log('Usage: node dataUtils.js lookup <aadhaar_number>');
        break;
      }
      console.log(`🔍 Looking up Aadhaar: ${aadhaar}`);
      console.log('============================');
      const record = utils.get(aadhaar);
      if (record) {
        console.log(JSON.stringify(record, null, 2));
      } else {
        console.log('Record not found.');
      }
      break;

    case 'states':
      console.log('📍 Available States');
      console.log('==================');
      const states = utils.getStates();
      states.forEach((state, index) => {
        console.log(`${index + 1}. ${state}`);
      });
      break;

    case 'cities':
      console.log('🏙️  Available Cities');
      console.log('==================');
      const cities = utils.getCities();
      cities.slice(0, 50).forEach((city, index) => {
        console.log(`${index + 1}. ${city}`);
      });
      if (cities.length > 50) {
        console.log(`... and ${cities.length - 50} more cities`);
      }
      break;

    default:
      console.log('🛠️  Mock Aadhaar Data Utilities');
      console.log('===============================');
      console.log('Available commands:');
      console.log('  stats                    - Show dataset statistics');
      console.log('  random [count]           - Show random records (default: 5)');
      console.log('  search <name>            - Search records by name');
      console.log('  lookup <aadhaar>         - Lookup specific Aadhaar number');
      console.log('  states                   - List all available states');
      console.log('  cities                   - List all available cities');
      console.log('');
      console.log('Examples:');
      console.log('  node dataUtils.js stats');
      console.log('  node dataUtils.js random 10');
      console.log('  node dataUtils.js search "Rajesh"');
      console.log('  node dataUtils.js lookup 123456789012');
  }
}

module.exports = AadhaarDataUtils;

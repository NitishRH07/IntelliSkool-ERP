const fs = require('fs');
const content = fs.readFileSync('constants.ts', 'utf8');

// Look for the first student name in the SOUTH_INDIAN_STUDENT_NAMES array
const nameMatch = content.match(/"Arjun"/);
if (nameMatch) {
    console.log('Found first student name: Arjun');
    console.log('Username would be: arjun');
} else {
    console.log('Could not find expected student name');
}

// Check if we can find the student ID pattern
const idMatch = content.match(/S001/);
if (idMatch) {
    console.log('Found student ID pattern: S001');
} else {
    console.log('Could not find student ID pattern');
}
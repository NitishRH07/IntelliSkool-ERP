const fs = require('fs');
const content = fs.readFileSync('constants.ts', 'utf8');

// Extract student data
const studentMatches = content.match(/id: 'S\d+'.*?name: '.*?'/g);
console.log('Total students found:', studentMatches ? studentMatches.length : 0);

if (studentMatches) {
    console.log('First 15 students:');
    studentMatches.slice(0, 15).forEach((student, index) => {
        console.log(`${index + 1}. ${student}`);
    });
    
    console.log('\nSample usernames that would be created:');
    studentMatches.slice(0, 15).forEach((student, index) => {
        const nameMatch = student.match(/name: '(.*?)'/);
        if (nameMatch) {
            const name = nameMatch[1];
            const username = name.toLowerCase().replace(/\s+/g, '.');
            console.log(`${index + 1}. ${name} -> ${username}`);
        }
    });
}
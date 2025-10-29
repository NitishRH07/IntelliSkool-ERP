const fs = require('fs');
const path = require('path');

// Read the constants file to get all menu items
const constantsContent = fs.readFileSync(path.join(__dirname, 'constants.ts'), 'utf8');

// Extract all view names from the constants file
const viewMatches = constantsContent.match(/view:\s*'([^']+)'/g);
const views = viewMatches ? viewMatches.map(match => match.split("'")[1]) : [];

console.log('All views referenced in menus:');
views.forEach(view => console.log(`- ${view}`));

// Check which components exist
const componentDirs = ['ai', 'student', 'teacher', 'admin', 'parent', 'analytics'];
const existingComponents = [];

componentDirs.forEach(dir => {
    const dirPath = path.join(__dirname, 'components', dir);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file.endsWith('.tsx')) {
                const componentName = file.replace('.tsx', '');
                existingComponents.push(componentName);
            }
        });
    }
});

console.log('\nExisting components:');
existingComponents.forEach(comp => console.log(`- ${comp}`));

// Check which views don't have corresponding components
const missingViews = views.filter(view => {
    // Convert view name to component name convention
    const componentName = view.charAt(0).toUpperCase() + view.slice(1);
    return !existingComponents.includes(componentName);
});

console.log('\nViews without corresponding components:');
missingViews.forEach(view => console.log(`- ${view}`));
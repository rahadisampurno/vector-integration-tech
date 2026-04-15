const fs = require('fs');
const path = require('path');

const srcPaths = [
    path.join(__dirname, 'src/pages/services'),
    path.join(__dirname, 'src/pages/en/services')
];

function processDirectory(dir, isEnglish) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;

        // 1. Add import statement in frontmatter
        if (content.includes('WhyChooseUs')) {
            console.log(`Skipping ${file}, WhyChooseUs already imported.`);
        } else {
            const importMatch = content.match(/---\n([\s\S]*?)---/);
            if (importMatch) {
                const depth = isEnglish ? '../../../components/WhyChooseUs.astro' : '../../components/WhyChooseUs.astro';
                const newImport = `import WhyChooseUs from '${depth}';\n`;
                const newFrontmatter = importMatch[0].replace('---', `---\n${newImport}`);
                content = content.replace(importMatch[0], newFrontmatter);
                modified = true;
            }
        }

        // 2. Insert <WhyChooseUs /> right after <ServiceEcosystem>
        // Use english text for english pages!
        if (content.includes('<ServiceEcosystem') && !content.includes('<WhyChooseUs')) {
            const whyUsStr = isEnglish 
                ? `\n    <WhyChooseUs title="Why Choose VeinTech?" subtitle="Our approach isn't just about writing code. We deliver end-to-end business solutions that guarantee ROI, security, and long-term scalability." />\n`
                : `\n    <WhyChooseUs />\n`;
            
            // replace '<ServiceEcosystem />' or '<ServiceEcosystem ... />'
            // We can match <ServiceEcosystem /> or <ServiceEcosystem title=... />
            // Safe regular expression:
            content = content.replace(/(<ServiceEcosystem[^>]*>)/, `$1\n${whyUsStr}`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated ${file}`);
        }
    }
}

srcPaths.forEach((dir, idx) => processDirectory(dir, idx === 1));
console.log('Batch modification complete!');

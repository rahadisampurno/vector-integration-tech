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

        // 1. Add import statement in frontmatter if not exists
        if (!content.includes('import ServiceCTA')) {
            const importMatch = content.match(/---\n([\s\S]*?)---/);
            if (importMatch) {
                const depth = isEnglish ? '../../../components/ServiceCTA.astro' : '../../components/ServiceCTA.astro';
                const newImport = `import ServiceCTA from '${depth}';\n`;
                const newFrontmatter = importMatch[0].replace('---', `---\n${newImport}`);
                content = content.replace(importMatch[0], newFrontmatter);
                modified = true;
            }
        }

        // 2. Replace the HTML CTA Section with the Component
        const ctaRegex = /<!-- CTA Section -->[\s\S]*?<section[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/section>/;
        const match = content.match(ctaRegex);
        
        if (match) {
            const title = match[1].replace(/\s+/g, ' ').trim();
            const desc = match[2].replace(/\s+/g, ' ').trim();
            const link = match[3];
            const ctaText = match[4].replace(/\s+/g, ' ').trim();

            const replacement = `<!-- Premium CTA Component -->
    <ServiceCTA 
        title="${title}"
        description="${desc}"
        ctaText="${ctaText}"
        ${link !== '/contact' ? `ctaLink="${link}"` : ''}
    />`;

            content = content.replace(match[0], replacement);
            console.log(`Replaced CTA in ${file}`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
        }
    }
}

srcPaths.forEach((dir, idx) => processDirectory(dir, idx === 1));
console.log('Batch CTA update complete!');

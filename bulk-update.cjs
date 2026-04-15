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
        if (content.includes('ServiceEcosystem')) {
            console.log(`Skipping ${file}, ServiceEcosystem already imported.`);
        } else {
            // Find frontmatter end
            const importMatch = content.match(/---\n([\s\S]*?)---/);
            if (importMatch) {
                // To support both paths, typically components are in ../../components from services
                // Wait, if it's src/pages/services/ai.astro, components is at ../../components.
                // If it's src/pages/en/services/ai.astro, components is at ../../../components.
                const depth = isEnglish ? '../../../components/ServiceEcosystem.astro' : '../../components/ServiceEcosystem.astro';
                
                const newImport = `import ServiceEcosystem from '${depth}';\n`;
                const newFrontmatter = importMatch[0].replace('---', `---\n${newImport}`);
                content = content.replace(importMatch[0], newFrontmatter);
                modified = true;
            }
        }

        // 2. Change mb-32 to mb-20 to tighten spaces
        if (content.includes('mb-32')) {
            content = content.replace(/mb-32/g, 'mb-20');
            modified = true;
        }

        // 3. Insert <ServiceEcosystem /> before <!-- CTA Section -->
        if (content.includes('<!-- CTA Section -->') && !content.includes('<ServiceEcosystem')) {
            const ecosystemStr = isEnglish 
                ? `<ServiceEcosystem title="Ecosystem & Deep Integration" description="Our solutions are perfectly designed to connect seamlessly with your existing applications and technology infrastructure." />\n\n    `
                : `<ServiceEcosystem />\n\n    `;
            
            content = content.replace('<!-- CTA Section -->', `${ecosystemStr}<!-- CTA Section -->`);
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

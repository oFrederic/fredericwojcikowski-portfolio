#!/usr/bin/env node

/**
 * Profile Image Optimization Script
 * 
 * This script helps optimize and rename profile images for the portfolio.
 * 
 * Usage:
 * 1. Place your profile image in the project root
 * 2. Run: node scripts/optimize-profile-image.cjs your-image.jpg
 * 3. The script will create optimized versions and update the component
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const PROFILE_IMAGE_DIR = 'public/images/profile';
const IMAGE_NAME = 'frederic-wojcikowski-profile';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

function createImageOptimizationGuide() {
  const guide = `# Profile Image Optimization Guide

## Quick Setup

1. **Place your image** in the project root (same level as package.json)
2. **Rename it to:** \`${IMAGE_NAME}.jpg\` (or .png/.webp)
3. **Move it to:** \`${PROFILE_IMAGE_DIR}/\`
4. **The component will automatically use the new image**

## Manual Setup

If you prefer to do it manually:

1. **Rename your image** to: \`${IMAGE_NAME}.jpg\` (or .png/.webp)
2. **Place it in:** \`${PROFILE_IMAGE_DIR}/\`
3. **Update the component** to use: \`/images/profile/${IMAGE_NAME}.jpg\`

## Image Requirements

- **Format:** JPG, PNG, or WebP
- **Size:** At least 400x400px (will be displayed at 200x200px)
- **Aspect ratio:** Square (1:1) recommended
- **File size:** Under 500KB for optimal performance

## Optimization Tips

- Use a professional headshot or business casual photo
- Ensure good lighting and clear background
- Crop to square format if needed
- Compress the image to reduce file size

## Supported Formats

${SUPPORTED_FORMATS.map(format => `- ${format}`).join('\n')}

## File Structure

\`\`\`
public/
  images/
    profile/
      ${IMAGE_NAME}.jpg          # Your optimized profile image
      ${IMAGE_NAME}@2x.jpg       # High-DPI version (optional)
\`\`\`
`;

  fs.writeFileSync('PROFILE_IMAGE_SETUP.md', guide);
  console.log('✅ Created PROFILE_IMAGE_SETUP.md with detailed instructions');
}

function updateComponentWithImage() {
  const componentPath = 'src/components/About/About.tsx';
  
  if (!fs.existsSync(componentPath)) {
    console.log('❌ About component not found');
    return;
  }

  let componentContent = fs.readFileSync(componentPath, 'utf8');
  
  // Update the image path
  const newImagePath = `/images/profile/${IMAGE_NAME}.jpg`;
  const imageUpdateRegex = /src="\/path-to-your-image\.jpg"/;
  
  if (imageUpdateRegex.test(componentContent)) {
    componentContent = componentContent.replace(imageUpdateRegex, `src="${newImagePath}"`);
    fs.writeFileSync(componentPath, componentContent);
    console.log(`✅ Updated About component to use: ${newImagePath}`);
  } else {
    console.log('ℹ️  Component already updated or using different image path');
  }
}

async function optimizeProfileImage() {
  const inputPath = path.join(__dirname, '../public/images/profile/frederic-wojcikowski-profile.jpg');
  const outputDir = path.join(__dirname, '../public/images/profile');
  
  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error('❌ Profile image not found:', inputPath);
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);

    console.log('🖼️  Optimizing profile image...');
    console.log(`📁 Input: ${inputPath}`);
    console.log(`📊 Original size: ${originalSizeKB} KB`);

    // Create WebP version
    const webpPath = path.join(outputDir, 'frederic-wojcikowski-profile.webp');
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6,
        nearLossless: false
      })
      .toFile(webpPath);

    // Create optimized JPEG version
    const optimizedJpgPath = path.join(outputDir, 'frederic-wojcikowski-profile-optimized.jpg');
    await sharp(inputPath)
      .jpeg({ 
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(optimizedJpgPath);

    // Get optimized file sizes
    const webpStats = fs.statSync(webpPath);
    const optimizedJpgStats = fs.statSync(optimizedJpgPath);
    
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);
    const optimizedJpgSizeKB = (optimizedJpgStats.size / 1024).toFixed(2);

    // Calculate savings
    const webpSavings = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);
    const jpgSavings = ((originalStats.size - optimizedJpgStats.size) / originalStats.size * 100).toFixed(1);

    console.log('\n✅ Image optimization complete!');
    console.log('📊 File size comparison:');
    console.log(`   Original JPEG: ${originalSizeKB} KB`);
    console.log(`   Optimized JPEG: ${optimizedJpgSizeKB} KB (${jpgSavings}% smaller)`);
    console.log(`   WebP version: ${webpSizeKB} KB (${webpSavings}% smaller)`);
    
    console.log('\n📁 Generated files:');
    console.log(`   WebP: ${webpPath}`);
    console.log(`   Optimized JPEG: ${optimizedJpgPath}`);

    // Create a simple HTML test page to compare images
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Optimization Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .comparison { display: flex; gap: 20px; margin: 20px 0; }
        .image-container { text-align: center; }
        img { max-width: 300px; height: auto; border: 1px solid #ccc; }
        .stats { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Profile Image Optimization Test</h1>
    
    <div class="stats">
        <h3>File Size Comparison:</h3>
        <p><strong>Original JPEG:</strong> ${originalSizeKB} KB</p>
        <p><strong>Optimized JPEG:</strong> ${optimizedJpgSizeKB} KB (${jpgSavings}% smaller)</p>
        <p><strong>WebP:</strong> ${webpSizeKB} KB (${webpSavings}% smaller)</p>
    </div>

    <div class="comparison">
        <div class="image-container">
            <h3>Original JPEG</h3>
            <img src="frederic-wojcikowski-profile.jpg" alt="Original JPEG">
            <p>${originalSizeKB} KB</p>
        </div>
        <div class="image-container">
            <h3>Optimized JPEG</h3>
            <img src="frederic-wojcikowski-profile-optimized.jpg" alt="Optimized JPEG">
            <p>${optimizedJpgSizeKB} KB</p>
        </div>
        <div class="image-container">
            <h3>WebP</h3>
            <img src="frederic-wojcikowski-profile.webp" alt="WebP version">
            <p>${webpSizeKB} KB</p>
        </div>
    </div>

    <div class="stats">
        <h3>Recommendations:</h3>
        <ul>
            <li><strong>Use WebP</strong> for modern browsers (${webpSavings}% smaller)</li>
            <li><strong>Fallback to optimized JPEG</strong> for older browsers</li>
            <li><strong>Expected performance gain:</strong> ~${webpSavings}% faster image loading</li>
        </ul>
    </div>
</body>
</html>`;

    const testHtmlPath = path.join(outputDir, 'image-comparison.html');
    fs.writeFileSync(testHtmlPath, testHtml);
    console.log(`\n🔍 Test page created: ${testHtmlPath}`);
    console.log('   Open this file in your browser to compare image quality and file sizes.');

  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
  }
}

function main() {
  console.log('🎯 Profile Image Optimization Setup\n');
  
  // Create the profile images directory
  if (!fs.existsSync(PROFILE_IMAGE_DIR)) {
    fs.mkdirSync(PROFILE_IMAGE_DIR, { recursive: true });
    console.log(`✅ Created directory: ${PROFILE_IMAGE_DIR}`);
  }
  
  // Create optimization guide
  createImageOptimizationGuide();
  
  // Update component
  updateComponentWithImage();
  
  // Optimize profile image
  optimizeProfileImage();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Place your profile image in the project root');
  console.log('2. Rename it to:', `${IMAGE_NAME}.jpg`);
  console.log('3. Move it to:', `${PROFILE_IMAGE_DIR}/`);
  console.log('4. The component will automatically use the new image');
  
  console.log('\n💡 For best results:');
  console.log('- Use a square image (1:1 aspect ratio)');
  console.log('- Ensure good lighting and professional appearance');
  console.log('- Keep file size under 500KB');
  console.log('- Use JPG format for photos, PNG for graphics');
}

if (require.main === module) {
  main();
}

module.exports = { createImageOptimizationGuide, updateComponentWithImage }; 
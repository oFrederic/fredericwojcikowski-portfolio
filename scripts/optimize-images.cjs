const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Manual Image Optimization Script
 * 
 * This script converts PNG/JPG images to WebP format for better performance.
 * Run this whenever you add new project screenshots.
 * 
 * Usage: npm run optimize-images
 */

const PROJECTS_DIR = path.join(__dirname, '../public/images/projects');
const PROFILE_DIR = path.join(__dirname, '../public/images/profile');

// WebP conversion settings
const WEBP_OPTIONS = {
  quality: 80,         // Good quality vs size balance
  effort: 6,          // High compression effort (0-6)
  nearLossless: false // Better compression
};

async function optimizeImage(inputPath, outputPath) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    
    await sharp(inputPath)
      .webp(WEBP_OPTIONS)
      .toFile(outputPath);
    
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)} KB → ${(optimizedSize / 1024).toFixed(1)} KB (${savings.toFixed(1)}% smaller)`);
    
    return { originalSize, optimizedSize, savings };
    
  } catch (error) {
    console.error(`❌ Failed to optimize ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

async function optimizeDirectory(dirPath, dirName) {
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 ${dirName} directory not found, skipping...`);
    return;
  }
  
  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('.webp')
  );
  
  if (imageFiles.length === 0) {
    console.log(`📁 ${dirName}: No images to optimize`);
    return;
  }
  
  console.log(`\n📁 Optimizing ${dirName} (${imageFiles.length} images):`);
  console.log('='.repeat(50));
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(dirPath, file);
    const outputPath = path.join(dirPath, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    
    // Skip if WebP version already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inputTime = fs.statSync(inputPath).mtime;
      const outputTime = fs.statSync(outputPath).mtime;
      
      if (outputTime > inputTime) {
        console.log(`⏩ ${file} → WebP already exists and is up to date`);
        continue;
      }
    }
    
    const result = await optimizeImage(inputPath, outputPath);
    if (result) {
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
      successCount++;
    }
  }
  
  if (successCount > 0) {
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100);
    console.log(`\n💰 ${dirName} Summary:`);
    console.log(`   ${successCount} images optimized`);
    console.log(`   Total savings: ${totalSavings.toFixed(1)}% (${((totalOriginal - totalOptimized) / 1024).toFixed(1)} KB saved)`);
  }
}

async function main() {
  console.log('🚀 Manual Image Optimization');
  console.log('============================');
  
  // Check if Sharp is available
  try {
    await sharp({ create: { width: 1, height: 1, channels: 3, background: { r: 0, g: 0, b: 0 } } })
      .png()
      .toBuffer();
  } catch (error) {
    console.error('❌ Sharp not available. Run: npm install sharp');
    process.exit(1);
  }
  
  // Optimize both directories
  await optimizeDirectory(PROJECTS_DIR, 'Projects');
  await optimizeDirectory(PROFILE_DIR, 'Profile');
  
  console.log('\n🎉 Optimization complete!');
  console.log('\n💡 Tips:');
  console.log('   • Add new screenshots to public/images/projects/');
  console.log('   • Run "npm run optimize-images" after adding new images');
  console.log('   • Modern browsers will automatically use WebP versions');
  console.log('   • Original PNG/JPG files are kept as fallbacks');
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});

main();

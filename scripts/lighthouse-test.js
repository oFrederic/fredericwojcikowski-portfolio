// Lighthouse automated testing script
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouseAudit(url = 'http://localhost:4173') {
  console.log(`🚀 Starting Lighthouse audit for: ${url}`);
  
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
  });
  
  const options = {
    logLevel: 'info',
    output: ['json', 'html'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1
    }
  };

  try {
    const runnerResult = await lighthouse(url, options);
    
    // Extract scores
    const scores = {
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
      seo: Math.round(runnerResult.lhr.categories.seo.score * 100)
    };
    
    // Core Web Vitals
    const metrics = {
      firstContentfulPaint: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
      largestContentfulPaint: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
      cumulativeLayoutShift: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
      totalBlockingTime: runnerResult.lhr.audits['total-blocking-time'].numericValue
    };
    
    console.log('\n📊 LIGHTHOUSE RESULTS:');
    console.log('='.repeat(50));
    console.log(`🎯 Performance: ${scores.performance}/100 ${scores.performance >= 90 ? '✅' : '❌'}`);
    console.log(`♿ Accessibility: ${scores.accessibility}/100 ${scores.accessibility >= 95 ? '✅' : '❌'}`);
    console.log(`🛡️  Best Practices: ${scores.bestPractices}/100 ${scores.bestPractices >= 95 ? '✅' : '❌'}`);
    console.log(`🔍 SEO: ${scores.seo}/100 ${scores.seo >= 95 ? '✅' : '❌'}`);
    
    console.log('\n⚡ CORE WEB VITALS:');
    console.log('='.repeat(50));
    console.log(`🎨 First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)}ms`);
    console.log(`🖼️  Largest Contentful Paint: ${Math.round(metrics.largestContentfulPaint)}ms ${metrics.largestContentfulPaint <= 2500 ? '✅' : '❌'}`);
    console.log(`📐 Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(3)} ${metrics.cumulativeLayoutShift <= 0.1 ? '✅' : '❌'}`);
    console.log(`⏱️  Total Blocking Time: ${Math.round(metrics.totalBlockingTime)}ms ${metrics.totalBlockingTime <= 300 ? '✅' : '❌'}`);
    
    // Save reports
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const htmlPath = path.join(reportsDir, `lighthouse-${timestamp}.html`);
    const jsonPath = path.join(reportsDir, `lighthouse-${timestamp}.json`);
    
    fs.writeFileSync(htmlPath, runnerResult.report[1]);
    fs.writeFileSync(jsonPath, runnerResult.report[0]);
    
    console.log(`\n📄 Reports saved:`);
    console.log(`   HTML: ${htmlPath}`);
    console.log(`   JSON: ${jsonPath}`);
    
    // Success criteria check
    const passesTarget = scores.performance >= 90 && 
                        scores.accessibility >= 95 && 
                        scores.bestPractices >= 95 && 
                        scores.seo >= 95 &&
                        metrics.largestContentfulPaint <= 2500 &&
                        metrics.cumulativeLayoutShift <= 0.1;
    
    console.log(`\n${passesTarget ? '🎉 POC SUCCESS! All targets achieved!' : '⚠️  Some targets missed - check above'}`);
    
    return { scores, metrics, passesTarget };
    
  } finally {
    await chrome.kill();
  }
}

// Run if called directly
if (require.main === module) {
  runLighthouseAudit().catch(console.error);
}

module.exports = { runLighthouseAudit };
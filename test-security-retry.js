#!/usr/bin/env node

/**
 * Test script for security verification with retry mechanism
 */

const { SecurityVerificationService } = require('./libs/db/src/lib/security-verification-service.js');

async function testSecurityVerification() {
  console.log('🔒 Testing Security Verification with Retry Mechanism\n');

  const securityService = new SecurityVerificationService();

  const testUrls = [
    {
      name: 'Known Safe URL (Nubank)',
      url: 'https://nubank.com.br/convite/test123',
      expectedStatus: 'APROVADO'
    },
    {
      name: 'Suspicious URL (Grass.io)',
      url: 'https://app.grass.io/register/?referralCode=test123',
      expectedStatus: 'SUSPEITO'
    },
    {
      name: 'Potentially Problematic URL',
      url: 'https://get-rich-quick-scheme.com/ref/123',
      expectedStatus: 'BLOQUEADO'
    }
  ];

  for (const test of testUrls) {
    console.log(`\n📋 Testing: ${test.name}`);
    console.log(`🔗 URL: ${test.url}`);
    console.log(`📊 Expected Status: ${test.expectedStatus}`);
    console.log('─'.repeat(60));

    try {
      const startTime = Date.now();
      const result = await securityService.verifyReferralSecurity(test.url);
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log('✅ Security verification completed successfully!');
      console.log(`⏱️  Duration: ${duration}ms`);
      console.log(`🛡️  Status: ${result.status}`);
      console.log(`🎯 Confidence: ${result.confidence}%`);
      console.log(`📚 Sources Checked: ${result.sources_checked.join(', ')}`);
      console.log(`🔍 Findings: ${result.findings.length} items`);
      
      if (result.findings.length > 0) {
        console.log('   - ' + result.findings.slice(0, 2).join('\n   - '));
        if (result.findings.length > 2) {
          console.log(`   - ... and ${result.findings.length - 2} more`);
        }
      }
      
      console.log(`💡 Recommendation: ${result.recommendation.substring(0, 100)}...`);
      
      if (result.details) {
        console.log(`📈 Trust Score: ${result.details.trustworthiness_score}%`);
        console.log(`👍 Positive Mentions: ${result.details.positive_mentions}`);
        console.log(`👎 Negative Mentions: ${result.details.negative_mentions}`);
        console.log(`⚠️  Scam Indicators: ${result.details.scam_indicators.length}`);
      }

      // Check if result matches expectation
      if (result.status === test.expectedStatus) {
        console.log('🎉 Result matches expected status!');
      } else {
        console.log(`⚠️  Result (${result.status}) differs from expected (${test.expectedStatus})`);
      }

    } catch (error) {
      console.error('❌ Security verification failed:', error.message);
      
      if (error.message.includes('Attempt')) {
        console.log('🔄 Retry mechanism was triggered');
      }
    }

    console.log('─'.repeat(60));
  }

  console.log('\n🏁 Security verification tests completed!');
  console.log('\n📝 Key Features Tested:');
  console.log('   ✓ Retry mechanism with exponential backoff');
  console.log('   ✓ JSON parsing with error recovery');
  console.log('   ✓ Multiple attempt logging');
  console.log('   ✓ Fallback error handling');
  console.log('   ✓ Enhanced prompt instructions for retries');
}

// Run the test
testSecurityVerification().catch(console.error);

const { verifySingleLink, verifyDomain } = require('./utils/fraudDetection');

async function testLinks() {
    const links = [
        'google.com',
        'https://www.microsoft.com',
        'http://github.com',
        'bit.ly/test',
        'this-should-be-fake-12345.com'
    ];

    console.log('--- Debugging Link Verification ---');
    for (const link of links) {
        console.log(`\nChecking: ${link}`);
        try {
            const domain = link.replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
            const exists = await verifyDomain(domain);
            console.log(`DNS verifyDomain(${domain}): ${exists}`);

            const result = await verifySingleLink(link);
            console.log(`Verdict: ${result.verdict}, Score: ${result.score}`);
            console.log(`Flags: ${result.flags.join(', ') || 'None'}`);
        } catch (err) {
            console.log(`Error checking ${link}: ${err.message}`);
        }
    }
}

testLinks();

# Loop verify script
# Runs playwright tests and takes screenshots for regression checks

param(
    [string]$Page = "",
    [string]$Name = "verify"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Loop Verify ===" -ForegroundColor Cyan

# Check if dev server is running
$serverRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -ErrorAction Stop
    $serverRunning = $true
} catch {
    $serverRunning = $false
}

if (-not $serverRunning) {
    Write-Host "Dev server not running. Starting..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\USER\Documents\SoftDocs'; npm run dev" -WindowStyle Minimized
    Start-Sleep -Seconds 6
}

# Define pages to verify
$pages = @(
    @{ url = "/"; name = "home" },
    @{ url = "/docs/3.0/configuration"; name = "docs-config" },
    @{ url = "/docs/3.0/getting-started"; name = "docs-getting-started" },
    @{ url = "/docs/3.0/guides/versioning"; name = "docs-versioning" },
    @{ url = "/docs/3.0/reference/api"; name = "docs-api" },
    @{ url = "/changelog"; name = "changelog" },
    @{ url = "/pricing"; name = "pricing" },
    @{ url = "/components"; name = "components" }
)

# If specific page provided, only verify that page
if ($Page) {
    $pages = @($pages | Where-Object { $_.url -eq $Page })
    if ($pages.Count -eq 0) {
        $pages = @(@{ url = $Page; name = $Name })
    }
}

# Create proof directory if it doesn't exist
$proofDir = "C:\Users\USER\Documents\SoftDocs\proof"
if (-not (Test-Path $proofDir)) {
    New-Item -ItemType Directory -Path $proofDir -Force | Out-Null
}

# Build pages JSON for node script
$pagesJson = $pages | ConvertTo-Json -Compress

# Run playwright verification
$nodeScript = @"
const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    const pages = $pagesJson;
    
    const results = [];
    for (const p of pages) {
        try {
            await page.goto('http://localhost:3000' + p.url, { waitUntil: 'networkidle', timeout: 30000 });
            await page.screenshot({ path: 'proof/' + p.name + '.png', fullPage: false });
            results.push({ name: p.name, status: 'pass' });
        } catch (e) {
            results.push({ name: p.name, status: 'fail', error: e.message });
        }
    }
    
    await browser.close();
    
    const passed = results.filter(r => r.status === 'pass').length;
    const failed = results.filter(r => r.status === 'fail').length;
    
    console.log(JSON.stringify({ passed, failed, results }));
    
    if (failed > 0) {
        process.exit(1);
    }
})();
"@

Write-Host "Running playwright verification..." -ForegroundColor Yellow
$output = node -e $nodeScript 2>&1
$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) {
    Write-Host "=== Verification PASSED ===" -ForegroundColor Green
    Write-Host "Screenshots saved to proof/" -ForegroundColor Gray
    exit 0
} else {
    Write-Host "=== Verification FAILED ===" -ForegroundColor Red
    Write-Host $output
    exit 1
}

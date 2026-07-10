# SoftDocs Dev Launcher
# Usage: .\scripts\dev-local.ps1 [up|down|status|logs]

param(
    [ValidateSet("up", "down", "status", "logs")]
    [string]$Command = "up"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Port = 3000

function Start-Dev {
    Write-Host "[dev-local] Starting SoftDocs dev server..." -ForegroundColor Cyan

    # Install deps if needed
    if (-not (Test-Path "$ProjectRoot\node_modules")) {
        Write-Host "[dev-local] Installing dependencies..." -ForegroundColor Yellow
        Push-Location $ProjectRoot
        npm install
        Pop-Location
    }

    # Check if port is already in use
    $existing = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($existing) {
        Write-Host "[dev-local] Port $Port already in use. Stopping existing process..." -ForegroundColor Yellow
        $pid = (Get-Process -Id (Get-NetTCPConnection -LocalPort $Port).OwningProcess -ErrorAction SilentlyContinue).Id
        if ($pid) { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue }
        Start-Sleep -Seconds 1
    }

    Write-Host "[dev-local] Dev server starting on http://localhost:$Port" -ForegroundColor Green
    Write-Host "[dev-local] Press Ctrl+C to stop" -ForegroundColor Gray

    Push-Location $ProjectRoot
    npm run dev
    Pop-Location
}

function Stop-Dev {
    Write-Host "[dev-local] Stopping dev server..." -ForegroundColor Yellow
    $existing = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($existing) {
        $pid = (Get-Process -Id $existing.OwningProcess -ErrorAction SilentlyContinue).Id
        if ($pid) {
            Stop-Process -Id $pid -Force
            Write-Host "[dev-local] Stopped (PID: $pid)" -ForegroundColor Green
        }
    } else {
        Write-Host "[dev-local] No dev server running on port $Port" -ForegroundColor Gray
    }
}

function Show-Status {
    $existing = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($existing) {
        $proc = Get-Process -Id $existing.OwningProcess -ErrorAction SilentlyContinue
        Write-Host "[dev-local] Running on http://localhost:$Port (PID: $($proc.Id))" -ForegroundColor Green
    } else {
        Write-Host "[dev-local] Not running" -ForegroundColor Gray
    }
}

function Show-Logs {
    Write-Host "[dev-local] Logs are shown in the terminal running the dev server." -ForegroundColor Cyan
    Write-Host "[dev-local] Start with: .\scripts\dev-local.ps1 up" -ForegroundColor Gray
}

switch ($Command) {
    "up"     { Start-Dev }
    "down"   { Stop-Dev }
    "status" { Show-Status }
    "logs"   { Show-Logs }
}

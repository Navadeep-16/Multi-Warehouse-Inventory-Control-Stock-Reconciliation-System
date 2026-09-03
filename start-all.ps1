param(
    [switch]$skipBuild
)

if (-not $skipBuild) {
    Write-Host "Building project..." -ForegroundColor Cyan
    $mvnCmd = "mvn"
    if (Test-Path ".\apache-maven-3.9.6\bin\mvn.cmd") {
        $mvnCmd = ".\apache-maven-3.9.6\bin\mvn.cmd"
    }
    & $mvnCmd clean package -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed!" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

Write-Host "Starting Discovery Service..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar discovery-service/target/discovery-service-1.0.0-SNAPSHOT.jar"
Start-Sleep -Seconds 10

Write-Host "Starting API Gateway..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar"

Write-Host "Starting Auth Service..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar auth-service/target/auth-service-1.0.0-SNAPSHOT.jar"

Write-Host "Starting Product Service..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar product-service/target/product-service-1.0.0-SNAPSHOT.jar"

Write-Host "Starting Inventory Service..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar inventory-service/target/inventory-service-1.0.0-SNAPSHOT.jar"

Write-Host "Starting Order Service..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar order-service/target/order-service-1.0.0-SNAPSHOT.jar"

Write-Host "All services started!" -ForegroundColor Green
Write-Host "Keeping script alive so services don't terminate..." -ForegroundColor Yellow
while ($true) {
    Start-Sleep -Seconds 60
}

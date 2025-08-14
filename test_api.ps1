Write-Host "=== Testing: GET / ==="
curl.exe -i http://localhost:3000/
Write-Host ""

Write-Host "=== Testing: GET /users ==="
curl.exe -i http://localhost:3000/users
Write-Host ""

Write-Host "=== Testing: GET /users/3 ==="
curl.exe -i http://localhost:3000/users/3
Write-Host ""

Write-Host "=== Testing: POST /users ==="
curl.exe -i -X POST http://localhost:3000/users `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Frank\",\"country\":\"USA\",\"age\":28}'
Write-Host ""

Write-Host "=== Testing: PUT /users/2 ==="
curl.exe -i -X PUT http://localhost:3000/users/2 `
  -H "Content-Type: application/json" `
  -d '{\"age\":31}'
Write-Host ""

Write-Host "=== Testing: DELETE /users/6 (first time) ==="
curl.exe -i -X DELETE http://localhost:3000/users/6
Write-Host ""

Write-Host "=== Testing: DELETE /users/6 (second time - should be 404) ==="
curl.exe -i -X DELETE http://localhost:3000/users/6
Write-Host ""

Write-Host "=== Testing: GET /search?country=India ==="
curl.exe -i "http://localhost:3000/search?country=India"
Write-Host ""

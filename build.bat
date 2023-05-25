rmdir /S /Q dist

call npm i
call npm run build

cd dist
rmdir /S /Q ".git"
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:RelGarrido/angular-ngx-chips.git master:npm
cd ..


rmdir /S /Q dist
call npm i
call npx ng build modules
mv .git .git2
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:RelGarrido/angular-text-mask.git master:npm
rmdir /S /Q ".git"
mv .git2 .git


rmdir /S /Q dist
call npm i
call npx ng build modules
rename .git .git2
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:RelGarrido/angular-text-mask.git master:npm
rmdir /S /Q ".git"
rename .git2 .git


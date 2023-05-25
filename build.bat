echo 'Any change is master will be pushed'
git checkout master
git add --all
git commit -m "changes to master"
git push

pause
echo 'Building npm branch'

git branch -D npm
git checkout -b npm
rmdir /S /Q dist
rmdir /S /Q node_modules
pause

call npm i
call npx ng build modules
git add --all
git commit -m "deploy"
git push -f git@github.com:RelGarrido/angular-text-mask.git npm:npm --force
pause

rmdir /S /Q dist
git checkout master
git branch -D npm

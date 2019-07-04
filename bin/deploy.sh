echo 'Hold on to your butts'

rm -rf _site/*

# increment version in package.json

npm run build

msg='updates'
if [ $# -eq 1 ]; then
  msg=$1
fi

git add .
git commit -m "$msg"
git push

pushd _site

git add .
git commit -m "$msg"
git push

popd

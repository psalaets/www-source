echo 'Hold on to your butts'

# increment version in package.json

rm -rf _site/*
npm run build

msg='updates'
if [ $# -eq 1 ]; then
  msg=$1
fi

pushd _site

git add .
git commit -m "$msg"
git push

popd

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
rm -rf $DIR/../dist/
parcel build $DIR/../src/index.html $DIR/../src/assets/styles/*  $DIR/../src/assets/img/* --out-dir $DIR/../dist/ --public-url '/games/dist'
rm $DIR/../dist/*.map

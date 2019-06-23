DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
rm DIR/../dist/*.js
rm DIR/../dist/*.map
parcel build DIR/../src/index.html  --out-dir DIR/../dist/ --public-url '/games/dist'

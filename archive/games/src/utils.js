
export function getUser() {
  if(document.cookie == null)
    return null;

  let cookies = document.cookie.split(';');
  let user = null;
  for (let cookie of cookies) {
    if(cookie.startsWith("userid"))
      return user = cookie.split("=")[1];
  }
}

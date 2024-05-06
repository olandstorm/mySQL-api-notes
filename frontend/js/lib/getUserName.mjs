export default function getUserName() {
  const user = localStorage.getItem('user');

  return fetch('http://localhost:3000/users/' + user).then((res) => res.json());
}

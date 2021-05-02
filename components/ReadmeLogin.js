

export default function ReadmeLogin() {

  const accessAPI = async (e) => {
    e.preventDefault();
  fetch('/.netlify/functions/readme-login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'email',
          password: 'password',
        })
      }).then((res) => res.text()).then((apiUrl) => {
       
        console.log(apiUrl);
        window.open(apiUrl)
      })
      .catch((err) => {
          console.log(err);
      });
    }

  return (
      <button
        onClick={accessAPI}
      >
        {'Access API'}
      </button>
  );
}

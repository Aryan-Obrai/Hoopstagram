function GoogleButton() {
  async function openGoogleSSO() {
    window.open("http://localhost:5000/auth/google", "_self");
  }

  return <button onClick={() => openGoogleSSO()}>Google</button>;
}

export default GoogleButton;

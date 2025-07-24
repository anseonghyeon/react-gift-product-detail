function useUser() {
  function setEmail(email: string) {
    sessionStorage.setItem('userEmail', email);
  }

  function setName(name: string) {
    sessionStorage.setItem('userName', name);
  }

  function setAuthToken(token: any) {
    sessionStorage.setItem('userToken', token);
  }

  function getEmail() {
    return sessionStorage.getItem('userEmail');
  }

  function getName() {
    return sessionStorage.getItem('userName');
  }

  function getAuthToken() {
    return sessionStorage.getItem('userToken');
  }

  function doLogout() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userToken');
  }

  return {
    setEmail,
    setName,
    setAuthToken,
    getEmail,
    getName,
    getAuthToken,
    doLogout,
  };
}

export default useUser;

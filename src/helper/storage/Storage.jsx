const useStorage = () => {
  const getStorage = (name) => {
    const local = localStorage.getItem(name);
    const session = sessionStorage.getItem(name);
    const data = local ? local : session;

    return data;
  };

  const postStorage = (name, data, useSession = false) => {
    const serializedData =
      typeof data === "object" ? JSON.stringify(data) : data;
    if (useSession) {
      return sessionStorage.setItem(name, serializedData);
    } else {
      return localStorage.setItem(name, serializedData);
    }
  };

  const deleteStorage = (name) => {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
      return true;
    } else if (sessionStorage.getItem(name)) {
      sessionStorage.removeItem(name);
      return true;
    }
    return false;
  };

  return { getStorage, postStorage, deleteStorage };
};

export default useStorage;

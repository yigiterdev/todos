const {localStorage, sessionStorage} = window;

const webStorage = {
  local: {
    setItem(itemName: string, itemValue: WebStorageStoredValue) {
      localStorage.setItem(itemName, JSON.stringify(itemValue));
    },
    getItem(itemName: string): WebStorageStoredValue {
      let storedValue = localStorage.getItem(itemName);

      storedValue = storedValue ? JSON.parse(storedValue) : null;

      return storedValue;
    },
    removeItem(itemName: string) {
      localStorage.removeItem(itemName);
    }
  },
  session: {
    setItem(itemName: string, itemValue: WebStorageStoredValue) {
      sessionStorage.setItem(itemName, JSON.stringify(itemValue));
    },
    getItem(itemName: string): WebStorageStoredValue {
      let storedValue = sessionStorage.getItem(itemName);

      storedValue = storedValue ? JSON.parse(storedValue) : null;

      return storedValue;
    },
    removeItem(itemName: string) {
      sessionStorage.removeItem(itemName);
    }
  },

  getFromWebStorage(itemName: string): WebStorageStoredValue {
    let itemValue = webStorage.local.getItem(itemName);

    if (!itemValue) {
      itemValue = webStorage.session.getItem(itemName);
    }

    return itemValue;
  },
  removeFromWebStorage(itemName: string) {
    webStorage.session.removeItem(itemName);
    webStorage.local.removeItem(itemName);
  }
};

export default webStorage;

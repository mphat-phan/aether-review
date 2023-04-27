const asyncLocalStorage = {
    setItem: function (key: string, value: string) {
        return new Promise((resolve, reject) => {
            resolve(localStorage.setItem(key, value))
        })
    },
    getItem: function (key: string): any {
        return new Promise((resolve, reject) => {
            resolve(localStorage.getItem(key))
        })
    }
}

export default asyncLocalStorage

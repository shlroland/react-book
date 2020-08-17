import localForage from 'localforage'

export function setLocalForage(
  key: string,
  data: Blob,
  cb: (...args: any) => any,
  cb2: (...args: any) => any
) {
  localForage
    .setItem(key, data)
    .then((value) => {
      if (cb) cb(value)
    })
    .catch(function (err) {
      if (cb2) cb2(err)
    })
}

export function getLocalForage(key: string, cb: (...args: any) => any) {
  localForage.getItem(key, (err, value) => {
    cb(err, value)
  })
}

export function removeLocalForage(
  key: string,
  cb: (...args: any) => any,
  cb2: (...args: any) => any
) {
  localForage
    .removeItem(key)
    .then(function () {
      cb()
    })
    .catch(function (err) {
      cb2(err)
    })
}

export function clearLocalForage(
  cb?: (...args: any) => any,
  cb2?: (...args: any) => any
) {
  localForage
    .clear()
    .then(function () {
      if (cb) cb()
    })
    .catch(function (err) {
      if (cb2) cb2(err)
    })
}

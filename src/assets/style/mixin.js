const center = () => {
  return `
      display: flex;
      justify-content: center;
      align-items: center;
    `
}

const top = () => {
  return `
      display: flex;
      justify-content: center;
      align-items: flex-start`
}

const bottom = () => {
  return `
      display: flex;
      justify-content: center;
      align-items: flex-end;
  `
}

const left = () => {
  return `
      display: flex;
      justify-content: flex-start;
      align-items: center;
      `
}

const right = () => {
  return `
      display: flex;
      justify-content: flex-end;
      align-items: center;
      `
}

export { center, top, bottom, left, right }

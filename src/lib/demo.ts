function demo(): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(()=>{
        const obj1 = {a:1};
        const obj2 = {b:2};
        const result = {...obj1, ...obj2};
        resolve(result);
      }, 1000)
    } catch (err) {
      reject(err);
    }
  })
}

if ([1, 2, 3].includes(2)) {
  console.log('include 2');
}

export default demo;
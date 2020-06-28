function asyncToGenerator(generatorFunc: GeneratorFunction) {
  return function(...args: any[]) {
    // @ts-ignore
    const gen = generatorFunc.apply(this, args);

    return new Promise((resolve, reject) => {
      function step(key: string, arg?: any) {
        let generatorResult;

        try {
          generatorResult = gen[key as "next" | "throw"](arg);
        } catch (error) {
          reject("error");
        }

        // @ts-ignore
        const { value, done } = generatorResult;

        if (done) {
          return resolve(value);
        } else {
          // 继续下一步迭代
          Promise.resolve(value).then(
            function onResolve(val) {
              step("next", val);
            },
            function onReject(err) {
              step("throw", err);
            }
          );
        }
      }

      step("next");
    });
  };
}

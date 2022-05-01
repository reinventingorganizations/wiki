function flattenArray(outputArray, innerItems) {
  Array.prototype.push.apply(outputArray, innerItems);
  return outputArray;
}

module.exports = {
  eleventyComputed: {
    topics: (data) => {
      // Declare dependencies for 11ty
      data.collections.theory;

      return (
        data.relatedTheory &&
        data.relatedTheory
          .map((key) => {
            return (
              data.collections.theory &&
              data.collections.theory.find((item) => item.data.key === key)
            );
          })
          .filter((theory) => Boolean(theory))
      );
    },
    cases: (data) => {
      return data.collections.cases
        .map((_case) => {
          return (
            _case.data.theory &&
            _case.data.theory
              .filter((theory) => theory.topic === data.key)
              .map((theory) => ({
                ...theory,
                case: _case,
              }))
          );
        })
        .reduce(flattenArray, []);
    },
  },
};

function flattenArray(outputArray, innerItems) {
    Array.prototype.push.apply(outputArray, innerItems);
    return outputArray;
  }
  
  module.exports = {
    eleventyComputed: {
      theoryContent: (data) => {
        // Declare dependencies for 11ty
        data.collections.theory;
        
        return data.theory.map(theory => {
            const topicItem = data.collections.theory.find(item => item.data.key === theory.topic)
            //console.log(topicItem)
            return {
                ...theory,
                topic: (topicItem && topicItem.data.name) || theory.topic
            }
        })
      },
    },
  };
  
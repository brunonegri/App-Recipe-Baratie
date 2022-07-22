const setArrayIngredients = async (results) => {
  if (results.length !== 0) {
    const arrayIngredients = [];
    const arrayMeasures = [];
    Object.entries(results[0]).forEach((e) => {
      if (e[0].includes('strIngredient') && e[1] !== '' && e[1] !== null) {
        arrayIngredients.push(e[1]);
      }
    });
    Object.entries(results[0]).forEach((e) => {
      if (e[0].includes('strMeasure') && e[1] !== '' && e[1] !== null) {
        arrayMeasures.push(e[1]);
      }
    });

    const measureAndIngredient = [];
    arrayIngredients.forEach((e, i) => {
      if (arrayMeasures[i] !== undefined) {
        measureAndIngredient.push(`${arrayMeasures[i]} - ${e}`);
      } else {
        measureAndIngredient.push(`${e}`);
      }
    });
    return measureAndIngredient;
  }
  // console.log(results[0]);
};

export default setArrayIngredients;

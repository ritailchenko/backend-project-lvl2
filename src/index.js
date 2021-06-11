import fs from 'fs';
import path from 'path';
import _ from 'lodash'

const genDiff = (file1, file2) => {

  let path1 = path.resolve("..", file1);
  let path2 = path.resolve("..", file2)
  
  let data1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  let data2 = JSON.parse(fs.readFileSync(path2, 'utf8'));

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2); 

    const result = {};

    keys.map((key) => {
        if (!_.has(data1, key)) {
        //  result[key] = 'added';
        result[key] = data2[key];
        } 
        else if (!_.has(data2, key)) {
              // result[key] = 'deleted';
              result[key] = data1[key]
              
            } else if (data1[key] !== data2[key]) {
            //  result[key] = 'changed';
              result[key] = data1[key];
              
              
            } else {
            //  result[key] = 'unchanged';
              result[key] = data1[key]
            }
    })

    
    return result;
  };
 



























// const genDiff = (file1, file2) => {
//   let path1 = path.resolve("..", file1);
//   let path2 = path.resolve("..", file2)
  
//   const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
//   const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));

//   let key1 = Object.keys(obj1);
//   let key2 = Object.keys(obj2);
//   let value1 = Object.values(obj1);
//   let value2 = Object.values(obj2);


//   let emptyObj = {};

//   // only in 1st obj
//   for (let i of key1) {
//     if (!key2.includes(i)) {
//       emptyObj[`- ${i}`] = obj1[i]
//       // emptyObj[i] = obj1[i];
//     }
//   }

//   // same key and value in booth
//   for (let i of value1) {
//     if (value2.includes(i)) {
//       emptyObj[key1[value1.indexOf(i)]] = value1[value1.indexOf(i)];
//     }
//   }

//   // same key in booth, but different value
//   for (let i of key1) {
//     if (key2.includes(i)) {
//       if (obj1[i] !== obj2[i]) {
//         emptyObj[`- ${i}`] = obj1[i];
//         emptyObj[`+ ${i + 1}`] = obj2[i]
//       }
//     }
//   }

//   // only in 2nd obj
//   for (let i of key2) {
//     if (!key1.includes(i)) {
//       emptyObj[`+ ${i}`] = obj2[i];
//     }
//   }
//     return emptyObj;
// };

// console.log(genDiff(file1, file2));

export default genDiff;

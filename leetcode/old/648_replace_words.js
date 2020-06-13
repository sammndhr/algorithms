/*In English, we have a concept called root, which can be followed by some other words to form another longer word - let's call this word successor. For example, the root an, followed by other, which can form another word another.

Now, given a dictionary consisting of many roots and a sentence. You need to replace all the successor in the sentence with the root forming it. If a successor has many roots can form it, replace it with the root with the shortest length.

You need to output the sentence after the replacement.*/

/**
 * @param {string[]} dict
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function(dict, sentence) {
  const res = {};
  const sentenceArr = sentence.split(' ');

  for (let i = 0; i < dict.length; i++) {
    let len = dict[i].length-1;
    for (let j = 0; j < sentenceArr.length; j++) {
      let d = 0;
      do {
        if (dict[i][d] !== sentenceArr[j][d]) {
          break;
        }
        if (d === len) {
          if (res[j] === undefined) {
            res[j] = i;
          } else {
            res[j] = dict[res[j]].length -1 < len ? res[j] : i;
          }
        }
        d++;
      } while(sentenceArr[j][d]);
    }
  }

  for (let key in res) {
    sentenceArr[key] =  dict[res[key]]
  }

  return sentenceArr.join(" ");
};

let dict = ["catt", "bat", "cat", "rat"];
let sentence = "the cattle was rattled by the battery";
console.log(replaceWords(dict, sentence));
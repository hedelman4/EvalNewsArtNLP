//import { checkForName } from './js/nameChecker'
//import { handleSubmit } from './js/formHandler'
let text = ''
let score_tag = ''
let subjectivity = ''

/*
console.log(checkForName);
alert("I EXIST")
console.log("CHANGE!!");
*/

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
    });
  
    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

async function performAction() {
    const response = await fetch('/all')
    const data = await response.json()
    const meanCloud = await fetch('https://api.meaningcloud.com/sentiment-2.1?key='+data['myKey']+'&lang=en&txt=sample')
    const meanCloudData = await meanCloud.json()
    text = document.getElementById('name').value
    score_tag = meanCloudData['score_tag']
    subjectivity = meanCloudData['subjectivity']
    postData('/add', {text:text, score_tag:score_tag, subjectivity:subjectivity})
    updateUI()
}

document.getElementById('submit').addEventListener('click', performAction);

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json()
        console.log(allData)
        document.getElementById('results').innerHTML = allData.text + ' ' + allData.score_tag + ' ' + allData.subjectivity
    }catch(error){
      console.log("error", error);
    }
  }
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyC3N7y7MP9VOMc68_1QqR7Z4mZ_iozJIz8",
    authDomain: "anpr-mace.firebaseapp.com",
    projectId: "anpr-mace",
    storageBucket: "anpr-mace.appspot.com",
    messagingSenderId: "618719025996",
    appId: "1:618719025996:web:af7dd4388687dbe081cde9"
};
import {getFirestore, doc, getDocs, setDoc, collection} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

initializeApp(firebaseConfig)
const db = getFirestore();


//Default content
document.getElementById("today-date").innerHTML;
document.getElementById("recommended_time").innerHTML;
document.getElementById("chance_of_getting_parking_slot_now").innerHTML;
document.getElementById("number_of_vehicles_present_now").innerHTML;
document.getElementById("number_of_parking_slots").innerHTML;
document.getElementById("available_slots").innerHTML;
document.getElementById("today-date").innerHTML;

var today = new Date(); 
let month = today.getMonth() + 1 >= 10 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1); 
let day = today.getDate() >= 10 ? today.getDate(): '0' + today.getDate(); 
var date = day + '-' + month + '-' + today.getFullYear();
console.log(date);
const colRef = collection(db, date)
const predict = collection(db, "prediction_result")
const get_vehicle_count = collection(db, 'number_of_vehicles_inside')
var s = "number_of_vehicles_inside_" + date;
var p = "predicted_value_of_" + date;





let fetBtn = document.getElementById("Fetbtn");




var chance_of_getting_parking_slot_now;
var available_slots;
var recommended_time;
var number_of_parking_slots = 200;


function current_hour(){
    var current = new Date();
    var hour = current.getHours();
    switch(hour){
        case 8:
            return '8AM - 9AM';
            break;
        case 9:
            return '9AM - 10AM';
            break;
        case 10:
            return '10AM - 11AM';
            break;
        case 11:
            return '11AM - 12PM';
            break;
        case 12:
            return '12PM - 1PM';
            break;
        case 13:
            return '1PM - 2PM';
            break;
        case 14:
            return '2PM - 3PM';
            break;
        case 15:
            return '3PM - 4PM';
            break;
        default:
            return 'error';
            break;
    }
    return 0;
}

console.log(current_hour());
function FetchPrediction() {
    getDocs(predict)
        .then((snapshot) => {
            let fetchdatas = []
            snapshot.docs.forEach((doc) => {
                if(doc.id == p) {
                    console.log(doc.id)
                    fetchdatas.push({ ...doc.data()})
                }
            })

            let time_slot = [
                '8AM - 9AM',
                '9AM - 10AM',
                '10AM - 11AM',
                '11AM - 12PM',
                '12PM - 1PM',
                '1PM - 2PM',
                '2PM - 3PM',
                '3PM - 4PM'
            ];
            
            var time_slot_count = 0;

            console.log("This");


            var myTable = '<table> <th>Time</th> <th>Prediction Rate</th>';

            console.log("Hello World");
            console.log(fetchdatas);
            console.log("Hello World");
            let recommended_time;
            var x;
            let big_rate = 0;

            var current_time_slot;
            
            fetchdatas.forEach(obj => {


                // console.log(obj['8AM - 9AM']);
                myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }
                myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }
                myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }
                myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }
                myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }
                myTable += `<tr><td>${time_slot[time_slot_count]}</td><td>${obj[time_slot[time_slot_count]]}%</td></tr>`;
                x = parseInt(obj[time_slot[time_slot_count++]]);
                if(big_rate < x){
                    big_rate = x;
                    recommended_time = time_slot[time_slot_count-1]
                }

                current_time_slot = current_hour();
                if(current_time_slot == 'error'){
                    chance_of_getting_parking_slot_now = "College Closed";
                    recommended_time = "College Closed";
                }
                else chance_of_getting_parking_slot_now = obj[current_time_slot] + '%';
                console.log("Current prediction : " + chance_of_getting_parking_slot_now);


            })
            myTable += "</tr></table>";
            document.getElementById("list-details").innerHTML = myTable;
            document.getElementById("recommended_time").innerHTML = recommended_time;
            document.getElementById("chance_of_getting_parking_slot_now").innerHTML = chance_of_getting_parking_slot_now;

        })
        .catch(err => {
            console.log(err.message)
        })
}



var number_of_vehicles_inside_now;
getDocs(get_vehicle_count).then((snapshot) => {
    let count_data = []

    snapshot.docs.forEach((doc) => {
        if(doc.id == s) {
            console.log(doc.id)
            count_data.push({ ...doc.data()})
        }
    })
    number_of_vehicles_inside_now = count_data[0].number_of_vehicles_inside_now;
    available_slots = Math.max(0, (number_of_parking_slots - number_of_vehicles_inside_now));



    document.getElementById("number_of_vehicles_present_now").innerHTML = number_of_vehicles_inside_now;
    document.getElementById("number_of_parking_slots").innerHTML = number_of_parking_slots;
    document.getElementById("available_slots").innerHTML = available_slots;
    document.getElementById("recommended_time").innerHTML = recommended_time;
    document.getElementById("today-date").innerHTML = date;
})
.catch(err => {console.log(err.message)})

// fetBtn.addEventListener("click", FetchPrediction);
document.addEventListener("DOMContentLoaded", FetchPrediction());
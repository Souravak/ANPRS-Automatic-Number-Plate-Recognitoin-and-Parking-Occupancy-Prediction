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

var today = new Date(); 
let month = today.getMonth()+1 >= 10 ? (today.getMonth()+1) : '0'+(today.getMonth()+1); 
let day = today.getDate() >= 10 ? today.getDate(): '0'+today.getDate(); 
var date = day+'-'+month+'-'+today.getFullYear();
console.log(date);
const colRef = collection(db, date)
const get_vehicle_count = collection(db, 'number_of_vehicles_inside')
var s="number_of_vehicles_inside_" + date;


document.getElementById("today-date").innerHTML = date;

getDocs(get_vehicle_count).then((snapshot) => {
    let count_data = []

    snapshot.docs.forEach((doc) => {
        if(doc.id == s) {
            console.log(doc.id)
            count_data.push({ ...doc.data()})
        }
    })

    console.log(count_data)
    var displayData = [];
    count_data.forEach(obj => {
        console.log(count_data);
        displayData = `${obj.number_of_vehicles_inside_now }`;
    })
    document.getElementById("number_of_vehicles_present_now").innerHTML = displayData;
})
.catch(err => {console.log(err.message)})



getDocs(colRef)
    .then((snapshot) => {
        let fetchdatas = []
        snapshot.docs.forEach((doc) => {
            fetchdatas.push({ ...doc.data()})
        })


        console.log(fetchdatas)
        // sortng
        // fetchdatas.sort(function(a,b){
        //     console.log("FUN HERE");
        //     console.log(a.details.entry_time);
        //     console.log(a.details);

        //     console.log("FUN HERE");

            
        //     return a.details.entry_time.localeCompare(b.details.entry_time);
        // });
        console.log(fetchdatas);


        var myTable = '<table> <th>SL.NO</th> <th>Number Plate</th> <th>Status</th> <th>Entry Time</th> <th>Exit Time</th> <th>Owner</th> <tr>';
        var sl_no = 1;
        
        fetchdatas.forEach(obj => {
            if(obj.details.entry_time == 'NULL') obj.details.entry_time = '';
            if(obj.details.exit_time == 'NULL') obj.details.exit_time = '';
            if(obj.details.EntryOrExit == 'entry') obj.details.EntryOrExit = 'Inside';
            else obj.details.EntryOrExit = 'Left';
            if(obj.details.whose == 'outsider') obj.details.whose = 'Visitor';
            else obj.details.whose = 'Staff';
            myTable += `
                        <td>${sl_no}</td>
                        <td>${obj.plate_num}</td>
                        <td>${obj.details.EntryOrExit}</td>
                        <td>${obj.details.entry_time}</td>
                        <td>${obj.details.exit_time}</td>
                        <td>${obj.details.whose}</td>
            `;
            myTable += "</tr><tr>"; 
            sl_no ++;
        })
        myTable += "</tr></table>";
        document.getElementById("list-details").innerHTML = myTable;
    })
    .catch(err => {
        console.log(err.message)
    })



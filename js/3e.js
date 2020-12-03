class Prognoza{
    constructor(miejscowosc,dzien_tygodnia,arr_temp){
        this.miejscowosc = miejscowosc
        this.dzien_tygodnia = dzien_tygodnia
        this.arr_temp = arr_temp
    }


    avgTemp(){
        let result = 0
        for (const temp of this.arr_temp) {
            result += parseInt(temp)
        }
        return result/this.arr_temp.length
    }
}

let p1

document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById("formPrognoza").addEventListener('submit',(e)=>{
        e.preventDefault()
        p1 = new Prognoza()
        p1.miejscowosc = document.getElementById("city").value
        p1.dzien_tygodnia = document.getElementById("day").value
        p1.arr_temp = []
        document.getElementById("resPrognoza").innerHTML = 
        `
        <div><p>Miejscowosc: ${p1.miejscowosc}</p><p>Dzien tygodnia: ${p1.dzien_tygodnia}</p><p id='avgTempInfo'></p></div>
        <div class="table js">
            <table id='tempTable'>
                <tr>
                    <th>Data</th>
                    <th>Temperatura</th>
                </tr>
            </table>
        </div>
        `
    })

    document.getElementById("formTemp").addEventListener('submit',(e)=>{
        e.preventDefault()
        if(p1.arr_temp.length < 8){
            let temp = document.getElementById("temp").value
            p1.arr_temp.push(temp)
            document.getElementById("avgTempInfo").innerHTML = 'Srednia temperatura: ' + p1.avgTemp() + ' °C'
            document.getElementById("tempTable").innerHTML += `
            <tr class="tempRow">
                <td>${setDate()}</td>
                <td>${temp + ' °C'} <img class="edit-icon" src='./img/edit.svg' onclick="editTemp(this)" /></td>
            </tr>`
        }else{
            alert('W ciągu doby maksymalnie, może byc 8 wpisów dotyczących temperatury.')
        }
    })

});

const setDate = () => {
    let dateNow = new Date()
    let arrLength = p1.arr_temp.length - 1
    let hourParsed = arrLength == 0 ? "00:00" : arrLength > 3 ? arrLength*3 + ":00" : "0"+arrLength*3 + ":00"
    return dateNow.getFullYear() + '-' + (dateNow.getMonth()+1) + '-' + dateNow.getDate() + ' ' + hourParsed
}

const editTemp = (event) => {
    let modal = document.getElementById("modalTemp")
    let editTempForm = document.getElementById("editTemp")
    modal.classList.remove('hide')
    editTempForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        event.parentElement.innerHTML = event.parentElement.innerHTML.replace(/^[0-9]*/g,document.getElementById('tempNew').value)
        modal.classList.add('hide')
    })
    editTempForm.addEventListener('reset',(e)=>{
        e.preventDefault()
        modal.classList.add('hide')
    })
}
const buttons = document.querySelectorAll('.buttons');
const display = document.querySelector('#display');
const del = document.querySelector('.del');
const eq = document.querySelector('.equal');
var ptag = document.querySelector('span');
var numbers = '';

eq.addEventListener('click', () => {
    calc()
})

buttons.forEach(button => 
    button.addEventListener('click', (e)=> {

        if(!ptag)
        {
            ptag = document.createElement('span');
            display.appendChild(ptag);
        }
        if(e.target.textContent == 'X')
        {
            ptag.textContent += '*';          
            numbers += '*';
        }else
        {
            ptag.textContent += button.textContent;      
            numbers += button.textContent;
        }
        
        console.log(numbers);
    })
)

del.addEventListener('click', () =>{
    let content = display.querySelector('span').textContent;
    
    display.querySelector('span').textContent = content.slice(0, -1);
})

document.addEventListener('keyup', (event) => {
    if(event.key == 'Backspace')
    {
        let content = display.querySelector('span').textContent;   
        display.querySelector('span').textContent = content.slice(0, -1);
        numbers = numbers.slice(0,-1);
    }
    else        
    if(event.key.charCodeAt(0) >= 42 && event.key.charCodeAt(0) <= 57 &&
    event.key.charCodeAt(0) != 44)
    {
        if(!ptag)
            {
                ptag = document.createElement('span');
                display.appendChild(ptag);
            }
            ptag.textContent += event.key;
            numbers += event.key;            
    }
    else 
    if(event.key == 'Enter')   
    {
        calc()
    }
    else
    if(event.key == 'Escape')   
    {
        numbers = '';
        display.querySelector('span').textContent = '';
    }
    
})

function calc()
{
    if(numbers){
        let result = eval(numbers);
        console.log(result);
        display.querySelector('span').textContent = result; 
        // numbers = result;
    }
    
}







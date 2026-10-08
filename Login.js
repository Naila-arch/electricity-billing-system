

function App(){
    const [value,setvalue] = useState({
    name : "",
    email : "",
})
    function handlform(e){
  e.preventDefault()
  console.log(value);
    }
    function handleinput(e){
        console.log(e.target.value)
setvalue({
   
    ...value,
   [ e.target.name ]: e.target.value
})
    }
    return ( 
        
<form onSubmit={handlform}>
    <input placeholder=""name="name" value={value.name} onChange={handleinput}/>
<br/>
 <input placeholder=""name="email" value={value.email} onChange={handleinput}/>
<button type="submit">Login</button>
</form>

    )
}
export default App;
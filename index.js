
function app() {

    const on = (el, event, fn) => {

    }
    function loadJS(name){ 
  
        // Head tag
        var head = document.getElementsByTagName('head')[0] 
          
        // Creating script element
        var script = document.createElement('script') 
        script.src = name + '.js'
        script.type = 'text/javascript'
        // head.addEventListener("DOMNodeInserted", () => {
        //     console.log("Wow!!")
        // })
        // Adding script element
        head.append(script) 
          
    }

    const processData = () => {
        console.log("Data loaded", app.counties)
    }

    const inject = (el, html) => {
        el.innerHTML = html 
        return el
    }
    const error = (msg) => {
        footer.add(msg)
        footer.classList.add("error")
        setTimeout(()=>{}, 3000)
    }

    const $ = (id) => {
        const el = document.getElementById(id);
        
        if(!el) error("cannot find element " + id)
        // return
        el.on = el.addEventListener
        
        el.add = (html) => {
            inject(el, html)
        }
        return el;
    }

    const app = $("app")
    
    const body = app.add(`
        <div id="inner"></div>
        <div id="footer"></div>
    `)
    const footer = $("footer")
    const inner = $("inner")
    inner.add(`
        <button id="button" class="button">Click Me</button>
    `)

    const btn = $("button")
    btn.on("click", (el) => {
        console.log('Loading Data')
        loadJS("data")
        processData()
    })

    $("not_there")
    console.log(btn)


}
test = () => {
    console.log("It works")
}

function loadJS(name){ 
  
    // Head tag
    var head = document.getElementsByTagName('head')[0] 
      
    // Creating script element
    var script = document.createElement('script') 
    script.src = name + '.js'
    script.type = 'text/javascript'
    // signal when the script node has been created
    head.addEventListener("DOMNodeInserted", () => {
        console.log("Wow!!", data())

    })
    // Adding script element
    head.append(script) 
      
}
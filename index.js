
function app() {

    const on = (el, event, fn) => {

    }

    const tag = (tag, str, _class) => {
        if(!_class) return `<${tag}>${str}</${tag}>` 
        return `<${tag} class="${_class}">${str}</${tag}>`
    } 

    const th = (str, _class) => tag("th", str, _class)
    const td = (str, _class) => tag("td", str, _class)
    const li = (str, _class) => tag("li", str, _class)
    const span = (str, _class) => tag("span", str, _class)

    const dataAsTable = (data) => {
        // let html = "<table class=\"table\">"
        let html = '<table class=\"table\">'
        html += "<thead>"
        html += th("Name")
        html += th("Pop")
        html += "</thead>"
        for(const county of counties) {
            // li(county.name)

            html += "<li class=\"county\">"
            html += county.name
            html += span(county.pop)
            html += "</li>"
        }
        html += "</table>"
        return html
    }

    const dataAsList = (data) => {
        // let html = "<table class=\"table\">"
        let html = '<ul>'
        for(const county of counties) {
            html += "<li>"
            html += span(county.name, "county")
            html += span(county.pop, "hidden")
            html += "</li>"
        }
        html += "</ul>"
        return html
    }

    const processData = () => {
        const counties = data()
        console.log("Data loaded", counties)

        const html = dataAsList(counties)
        inner.addEventListener("DOMNodeInserted", () => {
            console.log("Wow!! Inner ready")

            const els = $(".county")
            console.log('els', els)
            for(const el of els){
                // console.log('hi')
                el.on("click", (ev) => {
                    const el = ev.target
                    // console.log('click')
                    const pop = el.nextSibling

                    pop.classList.toggle("hidden")
                    // console.log('pop', el, pop)
                })
            }


        })
        inner.add(html)

        return html
    }

    const inject = (el, html) => {
        el.innerHTML = html 
        return el
    }
    const error = (msg) => {
        footer.add(msg)
        footer.classList.add("error")
        // wait for 3 secs and delete message
        setTimeout(()=>{
            footer.add("")
            footer.classList.remove("error")
        }, 3000)
    }

    const $ = (selector) => {
        if(selector[0]==".") {
            selector = selector.substring(1)
            const els = document.getElementsByClassName(selector)
            for(const el of els) {
                el.on = el.addEventListener
                el.add = (html) => {
                    inject(el, html)
                }        
            }
            return els
        }
        const el = document.getElementById(selector)
        
        if(!el) {
            error("cannot find element " + selector)
            return    
        } 
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
        <button id="button" class="button">Load data!!</button>
    `)

    const btn = $("button")

    btn.on("click", (el) => {
        console.log('Loading Data')
        // loadJS("data")
        processData()
    })

    // $("not_there")
    console.log(btn)


}
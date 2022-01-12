
const loadScript = (filename) => {
    const sketchId = `${filename}Sketch`;
    // Remove existing
    //document.getElementById(sketchId)?.remove();

    var scriptTag = document.createElement('script');
    scriptTag.innerText = "...";
    scriptTag.setAttribute('id',`sketch`);
    scriptTag.setAttribute('src',`sketches/${filename}.js`);
    scriptTag.setAttribute('type',`text/javascript`);
    document.getElementById(filename).appendChild( document.createElement('button'));
    console.log(`Adding script w/ id: ${sketchId}`);
}

const startup = () => {
    document.getElementsByClassName('btn-primary').forEach(element => {
      element.onclick = () => loadScript(element.getAttribute("id"))  
    });
}

startup();
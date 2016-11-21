// deleteTextNodes

function deleteTextNodes(el) {
    for(var els of el.childNodes) {
        if(els.nodeType == 3) {
            els.remove();

        }
    }
}
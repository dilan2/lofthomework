//scanDOM

    function scanDOM() {
        var dom = document.getElementsByTagName('*');
        var obj = {}, temp = [];

        for (var i = 0; i < dom.length; i++) {
            if(obj[ dom[i].tagName ]) {
                obj[ dom[i].tagName ]++;
                } else {
                obj[ dom[i].tagName ] = 1;
            }
        }
        for (var i in obj) {
            temp.push(i);
        }
        for (var k = 0; k < temp.length; k++) {
            console.log(temp[k] + ':' + obj[ temp[k] ]);
        }


        var clsObj = {}, clsTemp = [];
        for(var i = 0; i < dom.length; i++) {
            if(dom[i].classList.value) {
//                console.log(dom[i].classList.value);
                if(clsObj[ dom[i].classList.value ]) {
                    clsObj[dom[i].classList.value]++;
                }else {
                    clsObj[dom[i].classList.value ]= 1;
                }
            }
        }
        for (var i in clsObj) {
            clsTemp.push(i);
        }
        for (var k = 0; k < clsTemp.length; k++) {
            console.log(clsTemp[k] + ':' + clsObj[ clsTemp[k] ]);
        }
//        console.log(clsObj);
    }
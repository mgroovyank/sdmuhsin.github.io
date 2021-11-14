


$(document).ready(function(){
    /* Text style */
    $("#textStyle").textbanner({cycles:100,growth:150});
    $("#nextButton").attr("disabled",true)

    function addImg(imgLink){
        $("#intContainer").append(
            `<div class = "container-fluid w-100 d-flex justify-content-center align-items-center my-4"> <img onload="$(this).fadeIn();" style = "max-width:50vw" src = ${imgLink} /> </div>`);
    }
    function addVideoAndPlay(link){

        $("#intContainer").append(
        `<video class = "mx-auto my-4" id = "studentVid" controls="controls" style = "width:50%;height:auto">
            <source id = "vidSrc" src = "${link}"  type="video/mp4">
        </video>`);
        $('#studentVid').trigger('play');
        $('#studentVid').prop('muted','false')

        
    }
    function loadTestAndExecute(test, stageId){
        $(stageId).empty()
        $(stageId).append("<div id = 'intContainer' class = 'container-fluid d-flex flex-column ' style= 'min-height:75%'></div>")
        $("#intContainer").append(`<h4>${test.title}</h4>`)
        let interval = 1000;
        test.asserts.forEach((assert,i)=>{
            setTimeout(function(){
                $("#intContainer").append(`<div id = "assert-item-${i}"class = "mx-4 d-flex justify-content-start align-items-start"> <p>${assert}</p> <div class = " spinner-${i} mx-4 my-1" id = 'loading' ></div></div>`)
            },interval)
            interval += 1000;  
        })
        
    }

    function passAssertItems(test,interval=1000){
        let n = test.asserts.length;
        for(let i = 0; i < n; i++){
            setTimeout(()=>{
                $(`#assert-item-${i}`).css(`color`,'#90EE90');
                $(`.spinner-${i}`).remove();
                $(`#assert-item-${i}`).append(`<p class = "mx-4 "> &check; </p>`);
                if(i==n-1){
                    $("#nextButton").attr("disabled",false);
                    if(test.videoLink){
                        addVideoAndPlay(test.videoLink)
                    }else if(test.imgLink){
                        addImg(test.imgLink)
                    }
                }
            },interval);
            interval += 1000;
        }
        
    }
    
    let testCounter = 0;
    function nextTest(){
        if(testCounter < tests.length){
            loadTestAndExecute(tests[testCounter],"#stage");
            passAssertItems( tests[testCounter], tests[testCounter].asserts.length * 1000)
            testCounter += 1;
        }
    }
    
    function playFUllVideo(stageId){
        $(stageId).empty()
        $(stageId).append("<div id = 'intContainer' class = 'container-fluid d-flex flex-column ' style= 'min-height:75%'></div>")
        addVideoAndPlay(tests[0].videoLink)
    }
    $("#nextButton").click(function(){
        
        if( testCounter < tests.length - 1){
            $("#nextButton").attr("disabled",true)
            nextTest();
        }else if(testCounter == tests.length - 1){
            playFUllVideo("#stage")
        }else if(testCounter == tests.length){
            // play title card

        }
        
    });

    $(".startButton").click(function(){
        $("#sadBg")[0].play();
        $("#sadbg").prop("muted",false);
        nextTest();
    });
})
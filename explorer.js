class main_explorer{
    constructor (){
        this.list_object={}
        this.reference="null"
        this.script=[]
    }
    element_delete(reference,row){
        row.remove()
        delete this.list_object[reference]
    }
    add_row(image,reference){//it add image of sprite and script
        let table=document.getElementById("table_list")

        let label=document.createTextNode(reference)
        let button=document.createElement("button")
        button.innerHTML="delete"
        var row=table.insertRow(0)
        image.onload=function (){
            let cell1=row.insertCell(0)
            cell1.appendChild(image)
            cell1.appendChild(label)
            cell1.appendChild(button)
        }
         button.onclick=function(){
           explorer.element_delete(reference,row)
           button.remove()
        }
    }
    add_reference(evt,value){
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
        var f=0
    for (f of files) {
      var fileName=f.name
      if(this.list_object[fileName]==undefined){
        let img=document.createElement("img")
        let reader = new FileReader();
        if(f.type.match('image.*')){
             reader.onload = function(e) {
                   img.src=e.target.result
                   img.style.height=50+"px"  
             }
              img.onclick=function(){
                       explorer.change_reference(img)
                   }   
        this.add_row(img,fileName)
        reader.readAsDataURL(f);
        }else{
             reader.onload = function(e) {
                   
                   img.src="im_script.png"
                   img.style.height=50+"px"
     
                   var script=parent.frames["scene"].document.createElement("script")
                   script.type="text/javascript";
                   script.innerHTML=e.target.result 
                   parent.frames["scene"].document.body.appendChild(script)
             }
             this.add_row(img,fileName) 
             reader.readAsText(f)
        }        
        this.list_object[fileName]=img
        
    }
       
    }
        document.getElementById("file").value=""
  }


    change_reference(reference){//it keeping the element it was selected
            this.reference=reference
    }
}
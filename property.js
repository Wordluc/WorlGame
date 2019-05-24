
class main_property{
    constructor(){
        document.getElementById("form").style.visibility="hidden"
    }
    change_select(way,type,value){//it manages radio/checkbox
        if(way==="read")
           this.property[type]=value
        else
            this.property[type]=document.getElementById(type).checked
    }
    new_property(object){//it show property of object 
        document.getElementById("form").style.visibility="visible"
        var table=document.getElementById("input_script").innerHTML=""
        this.property=Object.assign({},object.property)
        this.old_id=this.property.name
        for(var id in this.property){
            if(id !="type" && id!="visible")
                document.getElementById(id).value=this.property[id] 
        }
        if(this.property.script!=""){
              this.input=object.script.input
            this.add_input()
        }
        switch(this.property.type){
            case "wall":
                document.getElementById("type_w").checked=true
                break
            case "player":
                document.getElementById("type_p").checked=true
                break
             case "ghost":
                document.getElementById("type_g").checked=true
                break
        }
        if(this.property.visible==true)
                document.getElementById("visible").checked=true
        else 
                document.getElementById("visible").checked=false
    
    }
    add_input(){//it show fields of script input for change/entering value
        var table=document.getElementById("input_script")
              
        for (var id in this.input){
            let row=table.insertRow(0)
            let cell=row.insertCell(0)
            let input=document.createElement("INPUT")
            input.type="text"
            input.setAttribute("id","input_"+id)//it set id =input_nameProperty
            input.value=this.input[id]
            let label=document.createTextNode(id)
            cell.appendChild(label)
            cell.appendChild( document.createElement('br'))
            cell.appendChild(input)
         
        }
    }
    save_property(way){//it save property
        if(way=="save"){
        for(var id in this.property){
            if(id !="type" && id!="visible")
                this.property[id]=document.getElementById(id).value
        }
        for(var id in this.input){
            this.input[id]=document.getElementById("input_"+id).value
        }
                   console.log(this.input)
        parent.frames["scene"].scene.change_property(Object.assign({},this.property),this.input,this.old_id)
     
        document.getElementById("form").style.visibility="hidden"
    }
        else
            parent.frames["scene"].scene.change_property("delete","",this.old_id)
    }
}
